const path = require('path');
const crypto = require('crypto');
const glob = require('glob');
const micromatch = require('micromatch');
const fs = require('fs-extra');
const luamin = require('luamin');

const CONFIG_FILENAME = 'package.json';
const ROOT_DIR = path.resolve(__dirname, '..');
const AES_SCRIPT_PATH = path.join(__dirname, 'aes.lua');

const createMatcher = (patterns) => {
	const normalized = Array.isArray(patterns) ? patterns : [];
	if (!normalized.length) {
		return () => false;
	}
	return (file) => micromatch([file], normalized).length === 1;
};

const randomString = () => crypto.pseudoRandomBytes(32).toString('hex');

function loadPackageJson() {
	const packageJsonPath = path.join(ROOT_DIR, CONFIG_FILENAME);
	let packageJson;

	try {
		packageJson = fs.readJsonSync(packageJsonPath);
	} catch (error) {
		throw new Error(`Unable to read ${CONFIG_FILENAME}: ${error.message}`);
	}

	return packageJson;
}

const packageJson = loadPackageJson();
const encryptionConfig = packageJson.encryption || {};
const addonName = packageJson.name || 'addon';
const debug = Boolean(encryptionConfig.debug);
const keyHex = encryptionConfig.key;

if (typeof keyHex !== 'string' || keyHex.length !== 32 || keyHex.match(/[^0-9a-fA-F]/)) {
	throw new Error('encryption.key must be a 32-character hex string');
}

const key = Buffer.from(keyHex, 'hex');

const NO_RESTORE = false;
const SERVER_MODULE_PATTERNS = [
	'**/*',
	'!init',
	'!addon_game_mode_client',
	'!addon_game_mode',
	'!triggers/*',
	'!entities/*',
	'!units/*',
	'!lualib_bundle',
	'!requires',
	'!lib/tstl-utils',
];
const MINIFY_PATTERNS = ['**/*'];
const CLIENT_MODULE_PATTERNS = [];

const isClientModule = createMatcher(CLIENT_MODULE_PATTERNS);
const isMatchingLuaServerModule = createMatcher(SERVER_MODULE_PATTERNS);
const isMatchingLuaMinifyModule = createMatcher(MINIFY_PATTERNS);

function encryptCode(code) {
	const iv = crypto.randomBytes(16);

	const codeByteLength = Buffer.from(code).length;
	const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
	cipher.setAutoPadding(false);

	const encrypted = Buffer.concat([
		iv,
		cipher.update(code),
		cipher.update('\0'.repeat(16 - (codeByteLength % 16))),
		cipher.final(),
	]);

	return encrypted.toString('hex');
}

function printLuaString(data) {
	let indent = '';
	while (data.includes(`]${indent}]`)) {
		indent += '=';
	}
	return `[${indent}[${data}]${indent}]`;
}

const clientLuaModules = [];
function registerClientModule(code) {
	const moduleId = randomString();
	clientLuaModules.push({ moduleId, code });
	return moduleId;
}

function processLuaModule(modulePath, code) {
	if (isMatchingLuaServerModule(modulePath)) {
		const serverCode = `return (decryptModule("${encryptCode(code)}", ...))`;
		return serverCode;
	}

	if (isMatchingLuaMinifyModule(modulePath)) {
		return luamin.minify(code);
	}

	if (isClientModule(modulePath)) {
		registerClientModule(code);
	}

	return code;
}

function generateEncrypt(originalCode) {
	const code = `
			${fs.readFileSync(AES_SCRIPT_PATH, 'utf8')}

		local function fromHex(s)
			return s:gsub('..', function (cc) return string.char(tonumber(cc, 16)) end)
		end

		local key = {string.byte(fromHex(serverKey), 1, 16)}

		_G.decrypt = function(encrypted)
			local raw = fromHex(encrypted)
			local iv = {string.byte(raw, 1, 16)}
			local decrypted = ciphermode.decryptString(key, raw:sub(17), ciphermode.decryptCBC, iv)
			return string.sub(decrypted, 1, string.find(decrypted, "\\0") - 1)
		end

		_G.decryptModule = function(encrypted, ...)
			return (assert(load(decrypt(encrypted), debug.getinfo(2).source, nil, getfenv(2)))(...))
		end
	`;

	const serverCode = `
		serverKey = ${debug ? JSON.stringify(key.toString('hex')) : 'tostring(GetDedicatedServerKeyV2("encrypted_modules")):sub(1, 32)'}

		CustomNetTables:SetTableValue("common", "encrypt_key", {_=serverKey})
	`;

	const clientCode = `
		serverKey = (CustomNetTables:GetTableValue("common", "encrypt_key") or {})._ or ""
	`;

	return luamin.minify(`
		local serverKey
		if IsServer() then
			${serverCode}
		else
			${clientCode}
		end

		${code}
	`);
}

function encryptLua(tempPath, outPath) {
	for (const fileName of glob.sync('**/*', { cwd: tempPath, nodir: true })) {
		if (fileName === 'addon_init.lua') continue;
		const fileInputPath = path.join(tempPath, fileName);
		const fileOutputPath = path.join(outPath, fileName);
		if (fileName.endsWith('.lua')) {
			const code = fs.readFileSync(path.join(tempPath, fileName), 'utf8');
			fs.outputFileSync(fileOutputPath, processLuaModule(fileName.replace(/\.lua$/, ''), code));
		} else {
			fs.copySync(fileInputPath, fileOutputPath);
		}
	}

	const encryptPath = path.join(tempPath, 'encrypt.lua');
	fs.outputFileSync(
		path.join(outPath, 'encrypt.lua'),
		generateEncrypt(fs.existsSync(encryptPath) ? fs.readFileSync(encryptPath, 'utf8') : ''),
	);
}

const moveDir = (from, to) => {
	try {
		fs.moveSync(from, to);
	} catch {
		fs.copySync(from, to);
		fs.removeSync(from);
	}
};

const luaInPath = path.join(ROOT_DIR, `game/${addonName}/scripts/vscripts`);
const luaTempPath = path.join(ROOT_DIR, '_temp_vscripts');

try {
	moveDir(luaInPath, luaTempPath);
	encryptLua(luaTempPath, luaInPath);
} catch (error) {
	console.error(error);
} finally {
	if (!NO_RESTORE) {
		if (process.stdin.isTTY) {
			console.log('Files encrypted, press any key to reset to originals');
			process.stdin.setRawMode(true);
			process.stdin.once('data', () => {
				process.stdin.setRawMode(false);

				if (fs.existsSync(luaTempPath)) {
					fs.rmSync(luaInPath, { recursive: true, force: true });
					moveDir(luaTempPath, luaInPath);
				}

				process.exit();
			});
		} else if (fs.existsSync(luaTempPath)) {
			fs.rmSync(luaInPath, { recursive: true, force: true });
			moveDir(luaTempPath, luaInPath);
		}
	} else if (fs.existsSync(luaTempPath)) {
		fs.removeSync(luaTempPath);
	}
}
