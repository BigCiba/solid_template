interface Equipment {
    id: number, // 装备ID
    equipment_item_id: number, // 物品ID
    base_attribute_data: string, //{\"id\":\"str\",\"value\":309,\"level\":2,\"min\":0,\"max\":0} json字符串,
    advanced_attribute_data: string; // 同上
    exclusive_attribute_data: string;// 专属词条 同上
    main_attribute_data: string;// 主属性 {id:string,value:number,value_add:number} json字符串
    // equipped: boolean;
    equip_part: number; //装备部位
    inlay_check: boolean; //镶嵌状态 true:镶嵌中(无法进行其他操作)
    fusion_check: boolean; //融合状态 true:镶嵌中(无法进行其他操作)
    locked: boolean; // 锁定状态
    // equip_hero: number; // 装备的英雄ID
    level: number;	//装备等级
    in_equip_suit: string; // "223:1;224:1" 英雄ID：套装ID;...
    score: number;
}
interface Gem {
    id: number, // 装备ID
    equipment_item_id: number, // 物品ID
    main_attribute_data: string;// 主属性 {id:string,value:number,value_add:number} json字符串
    base_attribute_data: string, //{\"id\":\"str\",\"value\":309,\"level\":2,\"min\":0,\"max\":0} json字符串,
    advanced_attribute_data: string; // 同上
    exclusive_attribute_data: string;// 专属词条 同上
    total_build_count: number;
    remaining_build_count: number;
    equip_part: number;
    rarity: number;
    equip_hero: number; // 装备的英雄ID
    level: number;	//装备等级
    locked: boolean; // 锁定状态
    used: boolean; // 已被嵌入
    in_equip_suit: string; // "223:1;224:1" 英雄ID：套装ID;...
    score: number;
}
interface ServerEquipMainAttribute {
    id: string;
    value: number;
    value_add: number;
}

interface ServerEquipAttribute {
    id: string;
    percent: number,
    level: number,
    min: number,
    max: number,
    value: number;
}

interface SimplifyEquipment {
    equipment_item_id: number,
    main: string;
    level: number,
    equipped: boolean,
    locked: boolean,
    inlay_check: boolean,
    fusion_check: boolean,
    score: number;
    suit: number;
}
interface SimplifyGem {
    equipment_item_id: number,
    total_build_count: number,
    remaining_build_count: number,
    attribute_count: number,
    locked: boolean,
    used: boolean,
    score: number;
    suit: number;
}

interface ArtifactAttribute {
    id: string;
    percent: number,
    level: number,
    min: number,
    max: number,
    value: number;
    class: number;
}

interface SimplifyArtifactTicketProps {
    id: number,
    artifact_ticket_item_id: number,
    durability: number,
    locked?: boolean,
    // from kv
    rarity: number,
    part: number,
}
interface ArtifactTicketProps extends SimplifyArtifactTicketProps {
    main_attribute_data: ArtifactAttribute[],
    base_attribute_data: ArtifactAttribute[],
    advanced_attribute_data: ArtifactAttribute[],
    exclusive_attribute_data: ArtifactAttribute[],
}

interface SimplifyArtifactProps {
    id: number,
    artifact_item_id: number,
    in_awake: boolean,
    score: number,
    total_awake_chance: number,
    used_awake_chance?: number,
    locked?: boolean,
    // from kv
    rarity: number,
    part: number,
}

interface ArtifactProps extends SimplifyArtifactProps {
    main_attribute_data: ArtifactAttribute[],
    base_attribute_data: ArtifactAttribute[],
    advanced_attribute_data: ArtifactAttribute[],
    exclusive_attribute_data: ArtifactAttribute[],
    awake_choice: string,
}