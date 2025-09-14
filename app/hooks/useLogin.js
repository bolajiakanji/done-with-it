import { useState } from "react";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const useLogin = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const auth = useAuth();


    const request = async (registerObj) => {
        setLoading(true)
        const response = await authApi.login(registerObj)
        if (!response.ok) {
            if (response.data) setError(response.data.error);
            else setError("An unexpected error occured.");
            auth.login(response);


        }
            auth.login(response.data);
    };
     return { request, data, error, loading, setError, setLoading, setData };
};

export default useLogin

// const response = await loginApi.request({ email, password });

//     if (!response.ok) {
//       if (response.data) setError(response.data.error);
//       else {
//         setError("An unexpected error occured.");
//       }
//       return;
//     }

//     setError(false);
//     login(response.data);
//   ;