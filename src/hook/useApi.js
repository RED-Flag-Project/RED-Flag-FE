import { useCallback, useState } from "react";

export default function useApi(apiFn) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const res = await apiFn(...args);
        const payload = res?.data ?? res;
        setData(payload);
        return payload;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFn],
  );

  return { data, error, loading, execute };
}
