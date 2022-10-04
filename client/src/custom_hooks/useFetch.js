import { useEffect, useState } from 'react';
import apiService from '../services/apiService';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.fetchRequest(url, options);
      if (res) {
        setTimeout(() => {
          setResponse(res);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, isLoading, setResponse, fetchData };
};
