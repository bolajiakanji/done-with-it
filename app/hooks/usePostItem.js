import { useState } from "react";
import listingsApi from "../api/listings";

const usePostItem = () => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const postItem = async (listing, resetForm) => {
        setError(false)
        setProgress(0);
        setLoading(true);
        setUploadVisible(true);

        console('keseirutie')
        const response = await listingsApi.addListing({ ...listing },
            (progress) => setProgress(progress)
        );

        setLoading(false)

        if (!response.ok) {
            setError(true)
            setUploadVisible(false);
            return alert("Could not save the listing");
        }
        resetForm();
    }
    return {
        error,
        loading,
        progress,
        setUploadVisible,
        uploadVisible,
        postItem
    }
}

export default usePostItem