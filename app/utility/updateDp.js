import { client_2 } from "../api/client";
import authStorage from "../auth/storage";

const updateDp = (updateDpObject) => {
    const {
        setLoading,
        imageuri,
        setpi,
        setShowButton,
        login
    } = updateDpObject

    const postImage = async () => {
        setLoading(true)
        if (imageuri) {
            const data = new FormData();
            data.append("profileImage", {
                uri: imageuri,
                name: "profileImage",
                type: "image/jpeg",
            })
            const output = await client_2.post('/my/profileImage/', data, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            if (output.ok) {
            setpi(output.data.image)
            await authStorage.storeToken(output.data)
            login(output.data)
            setLoading(false)
            setShowButton(false)
            
            }
            setLoading(false)
        }
    }
    return postImage()
}

export default updateDp