import { useEffect } from "react";
import { client_2 } from "../api/client";

const useItemDetailsLogic = (
    setComments,
    endPoint,
    setLoadingCommentOnPageVisit,
) => {
    useEffect(() => {
        loadListing();
    }, []);

    const loadListing = async () => {
        setLoadingCommentOnPageVisit(true)
        const res = await client_2.get(endPoint);
        setLoadingCommentOnPageVisit(false)

        if (res.data) setComments(res.data.reverse());
    };
    return loadListing
}

export default useItemDetailsLogic