import { create } from "zustand"
import { Tenant } from "@/types/tenant"

interface TenantState {
  tenants: Tenant[]
  setTenants: (tenants: Tenant[]) => void
  currentTenant: Tenant | null
  setCurrentTenant: (tenant: Tenant | null) => void
  reset: () => void
}

export const useTenantStore = create<TenantState>((set, get, store) => ({
  tenants: [],
  setTenants: (tenants) => set({ tenants }),
  currentTenant: null,
  setCurrentTenant: (tenant) => set({ currentTenant: tenant }),
  reset: () => set(store.getInitialState()),
}))
