import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('dee1')
  const request = async (...args) => {
    setError("")
    return apiFunc(...args);
  };
  return { request, data, error, loading, setError, setLoading, setData };
};
