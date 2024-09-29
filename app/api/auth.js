import client from "./client"

const login = (userInfo) => client.post("/auth", userInfo)

const register = (name, email, password) =>
    client.post("/user", { name, email, password })

export default { login, register }
