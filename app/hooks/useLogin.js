import { useState } from "react";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const useLogin = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const request = async (registerObj) => {
        setLoading(true)
        const response = await authApi.login(registerObj)
        console.log(response)
        if (!response.ok) {
            if (response.data) {
                setError(response.data.error)
            setLoading(false)
            return
            };
            setError("An unexpected error occured.");
            setLoading(false)
            return
        }
        auth.login(response.data);
        setLoading(false)
    };
    return { request, data, error, loading };
};

export default useLogin

