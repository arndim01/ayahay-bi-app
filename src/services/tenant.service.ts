import { AYAHAY_API_URL, API_ENDPOINTS } from "@/constants"
import type { Tenant } from "@/types/tenant"

export interface TenantData {
  name: string
  slug: string
  api_base_url: string
  logo?: string
}

export interface EditTenantData {
  name: string
  slug: string
  api_base_url: string
  logo?: string
}

export class TenantService {
  async getTenants(): Promise<Tenant[]> {
    const response = await fetch(`${AYAHAY_API_URL}${API_ENDPOINTS.TENANTS}`, {
      method: "GET"
    })

    if (!response.ok) {
      throw new Error(`Error fetching tenants: ${response.statusText}`)
    }

    const data: Tenant[] = await response.json()

    return data
  }

  async createTenant(data: TenantData): Promise<Tenant> {
    const response = await fetch(`${AYAHAY_API_URL}${API_ENDPOINTS.TENANTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Error creating tenant: ${response.statusText}`)
    }

    const tenant: Tenant = await response.json()
    return tenant
  }

  async editTenant(data: EditTenantData, id: number): Promise<Tenant> {
    const response = await fetch(`${AYAHAY_API_URL}${API_ENDPOINTS.TENANTS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Error updating tenant: ${response.statusText}`)
    }

    const tenant: Tenant = await response.json()
    return tenant
  }

  async deleteTenant(id: number): Promise<void> {
    const response = await fetch(`${AYAHAY_API_URL}${API_ENDPOINTS.TENANTS}/${id}`, {
      method: "DELETE"
    })

    if (!response.ok) {
      throw new Error(`Error deleting tenant: ${response.statusText}`)
    }
  }
}

export const tenantService = new TenantService()

// Export individual functions for backward compatibility
export const createTenant = (data: TenantData) => tenantService.createTenant(data)
export const editTenant = (data: EditTenantData, id: number) => tenantService.editTenant(data, id)
export const deleteTenant = (id: number) => tenantService.deleteTenant(id)
