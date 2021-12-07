import { useState } from 'react';
import apiService from '../services/apiService';

export const usePost = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (url, body) => {
    setIsLoading(true);
    try {
      const res = await apiService.fetchRequest(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setResponse(res);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return { response, error, isLoading, postData };
};
