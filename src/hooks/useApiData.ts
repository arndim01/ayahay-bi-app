import { useEffect, useState, DependencyList } from "react";
import { apiService } from "@/services/api.service";

export function useApiData<T>(url: string, deps: DependencyList = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  return { data, loading, setData };
}
