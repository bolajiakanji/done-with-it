import client from "./client"

const login = (userInfo) => client.post("/auth", userInfo)

const register = (userInfo) =>
    client.post("/users", userInfo)

export default { login, register }
