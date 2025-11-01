declare interface CustomUIConfig {
}
declare interface StoreItemData {
	pay_type: number;
	origin_price: number;
	real_price: number;
	discount: number;
	tag: string;
	show_type: number;
	buff_condition: number;
	vip: number;
	title: number;
	rarity: number;
	img: string;
	particle: string;
	orderby: number;
	start_time: number;
	end_time: number;
	hide: number;
	limit_type: number;
	limit_count: number;
	overseas_originprice: number;
	overseas_realprice: number;
	russia_originprice: number;
	russia_realprice: number;
	first_pay: number;
	id: number;
	items: Record<string, number>;
}