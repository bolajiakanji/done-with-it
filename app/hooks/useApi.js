import { useState } from 'react';

export default useApi = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async () => {
        setLoading(true);
        const response = await apiFunc();
        setLoading(false);
    console.log(response)
        if (!response.ok) return  setError(true);
        console.log('not here')
        setError(false);
        setData(response.data);
    };
    return { request, data, error, loading }
}