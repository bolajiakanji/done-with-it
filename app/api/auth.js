import {client_2} from "./client"

const login = (userInfo) => client_2.post("/auth", userInfo)

const register = (userInfo) => client_2.post("/users", userInfo)

export default { login, register }
