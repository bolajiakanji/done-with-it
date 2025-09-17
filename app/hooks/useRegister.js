import { useState } from "react";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const useRegister = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const request = async (registerObj) => {
        setLoading(true)
        const response = await authApi.register(registerObj)
        setLoading(false)
        if (!response.ok) {
            if (response.data) setError(response.data.error);
            else setError("An unexpected error occured.")
        }
        const { email, password } = registerObj
        const { data: authToken } = await authApi.login({
            email,
            password,
        });
        auth.login(authToken);
    };
    return { request, data, error, loading, };
};

export default useRegister