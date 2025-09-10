import { useEffect, useState } from "react";
import { apiService } from "@/services/api.service";

export function useApiData<T>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiService.get<T>(url);
        console.log(`Fetched from ${url}:`, res);
        setData(res);
      } catch (err) {
        console.error(`Error fetching ${url}:`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, deps);

  return { data, loading, setData };
}
