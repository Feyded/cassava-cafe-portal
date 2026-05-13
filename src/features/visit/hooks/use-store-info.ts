import { useEffect, useState } from "react";
import { storeInfo, type StoreInfo } from "../data/store-info";

interface UseStoreInfoResult {
  data: StoreInfo | null;
  isLoading: boolean;
}

export function useStoreInfo(): UseStoreInfoResult {
  const [data, setData] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(storeInfo);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
}
