type CustomPanelEvent = PanelEvent | 'onblur';
declare interface PanelBase {
	SetPanelEvent(event: CustomPanelEvent, handler: () => void): void;
}
declare interface Panel extends PanelBase {
	FindAncestor(panelID: string): Panel;
	readonly actualuiscale_x: number;
	readonly actualuiscale_y: number;

	GetChild<T extends PanelBase>(index: number): T | null;

	FindChild<T extends PanelBase>(childId: string): T | null;
	FindChildTraverse<T extends PanelBase>(childId: string): T | null;
	FindChildInLayoutFile<T extends PanelBase>(childId: string): T | null;
	FindPanelInLayoutFile<T extends PanelBase>(id: string): T | null;
	Data<T extends object>(): T;
	/**
	 * 
	 * @param type 1:开始 2:末尾 3:中间
	 * @param bNotSmooth 不平滑地直接跳到目标点
	 */
	ScrollParentToMakePanelFit(iType: 1 | 2 | 3, bNotSmooth: boolean): void;
}

declare interface TooltipPanel extends Panel {
	GetTooltipTarget<T extends PanelBase = Panel>(): T;
}

declare interface OverheadUnitExtraInfo {
	is_selected: boolean,
	is_cursor: boolean,
	can_glow: boolean,
	all_barrier: number;
	max_all_barrier: number;
	physical_barrier: number;
	max_physical_barrier: number;
	magical_barrier: number;
	max_magical_barrier: number;
	armor: number,
	init_armor: number,
	no_health_bar: boolean,
}

declare interface WorldPanel extends Panel {
	// 官方提供的
	GetOwnerEntityID(): EntityIndex;
}

declare interface OverheadPanel extends Panel {
	unitEntIndex: EntityIndex;
	offset: number;
	lastHealthPercent: number;
	lastManaPercent: number;
	worldPanel: WorldPanel;
	UpdateEnemyOverheadPanel(t: OverheadUnitExtraInfo): void;
}

declare interface InventoryItemContextMenu extends Panel {
	SetAbilityPanel(pTargetPanel: any): void;
	RegisterAction(buttonID: string, action: (button: Button) => void): void;
}

declare interface Minimap extends Panel {
	mapscale: number;
}

declare interface PanoramaPanelNameMap {
	DOTAMinimap: Minimap;
}

declare interface ToastManager extends Panel {
	QueueToast(p: Panel): void;
	RemoveToast(p: Panel): void;
}

declare interface DollarStatic {
	<T extends PanelBase>(selector: string): T;
	GetContextPanel<T extends PanelBase>(): T;
}

declare interface ContextMenuScriptPanel extends Panel {
	GetContentsPanel<T extends PanelBase>(): T;
}

declare interface UICanvas extends Panel {
	/**
	 * 清空canvas，然后用color覆盖整个Canvas
	 * @param color rgba #FFFFFFFF
	 */
	ClearJS(color: string): void;

	/**
	 * 画一条折线
	 * @param iPoint 折线一共有几个点
	 * @param arrPoints 折线的坐标，格式为[x1, y1, x2, y2, x3, y3 ...]
	 * @param iWidth 线的宽度
	 * @param iMode 1 有抗锯齿
	 * @param sColor 折线的颜色
	 */
	DrawSoftLinePointsJS(iPoint: number, arrPoints: number[], iWidth: number, iMode: 0 | 1, sColor: string): void;
}


declare interface DOTAParticleScenePanelAttributes extends PanelAttributes<ParticleScenePanel> {
	particleonly?: boolean;
	squarePixels?: boolean;
	particleName: string;
	cameraOrigin?: string;
	lookAt?: string;
	fov?: number | string;
	startAcitve?: boolean;
}