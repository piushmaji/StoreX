import { useEffect, useState } from "react";
import { getPriceHistory } from "../services/priceHistoryService/priceHistoryService";

export function usePriceHistory(productId) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      const data = await getPriceHistory(productId);
      setHistory(data);
      setLoading(false);
    }

    if (productId) {
      loadHistory();
    }
  }, [productId]);

  return { history, loading };
}