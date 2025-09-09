export interface TenantShippingRoute {
	id: number
	tenant_id: number
	origin_code: string
	origin_id: number
	destination_code: string
	destination_id: number
	updated_at?: string | null
}

export interface Tenant {
	id: number
	name: string
	api_base_url: string
	slug: string
	logo?: string | null
	created_at?: string
	updated_at?: string | null
	shipping_routes?: TenantShippingRoute[]
}
