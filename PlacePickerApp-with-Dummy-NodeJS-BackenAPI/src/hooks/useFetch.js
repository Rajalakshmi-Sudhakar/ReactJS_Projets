import { useState, useEffect } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const places = await fetchFn();

        setFetchedData(places);
        //setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message ||
            "could not fetch data... please try again later...",
        });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  return { isFetching, error, fetchedData, setFetchedData };
}
