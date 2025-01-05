import { useContext } from "react"
import AuthContext from "./context"
import authStorage from './storage'

import { jwtDecode } from "jwt-decode"

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext)

    const login = async (auth_token) => {
        console.log('jwt')
        await authStorage.storeToken(auth_token)
        const user = jwtDecode(auth_token)

        console.log('userjwt'+ user)
        setUser(user)
    }

    const logOut = () => {
        setUser(null)
    authStorage.removeToken()
    }
    return { user, setUser, logOut, login}
}