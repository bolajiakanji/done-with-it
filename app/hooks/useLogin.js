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
        setLoading(false)
        if (!response.ok) {
            if (response.data) return setError(response.data.error)
            return setError("An unexpected error occured.");
        }
        auth.login(response.data);
    };
    return { request, data, error, loading };
};

export default useLogin

