import { useState, useEffect } from "react";

export default function useFetch(fetchFn, initalValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initalValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch data... please try again later",
        });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  //console.log("fetchedData", fetchedData);

  return { isFetching, error, fetchedData, setFetchedData };
}
