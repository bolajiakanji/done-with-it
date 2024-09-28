import { useContext } from "react"
import AuthContext from "./context"
import authStorage from './storage'

import { jwtDecode } from "jwt-decode"

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext)

    const login = (auth_token) => {
        const user = jwtDecode(auth_token)
        AuthContext.setUser(user)
        authStorage.storeToken(auth_token)
    }

    const logOut = () => {
        setUser(null)
    authStorage.removeToken()
    }
    return { user, setUser, logOut, login}
}