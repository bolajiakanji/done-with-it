const { useEffect, useState } = require("react");
import listingsApi from "../api/listings";
import useApi from "./useApi";

const useListings = (
    listingsQueryObject,
    setListingsQueryObject,
    setDisplayItems,
    setIsLoading
) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadListings();
    }, []);

    const request =
        useApi(listingsApi.getListings);

    const loadListings = async () => {
        setLoading(true);
        const response = await request({ page: 1 });
        setLoading(false);
        if (!response.ok) {
            if (response.data) return setError(response.data.error)
            return setError('An unexpected error occur')
        };

        setListingsQueryObject((queryObject) => {
            return { ...queryObject, page: response.data.nextPage };
        });
        setData(response.data);
        setDisplayItems(response.data.resources);
    };
    
    const loadListings_2 = async () => {
        setIsLoading(true);

        const response = await request({ page: listingsQueryObject.page });
        setIsLoading(false);

        if (!response) return setError("An unexpected error occured.");

        if (response.data.error) return setError(response.data.error);

        setListingsQueryObject((queryObject) => ({
            ...queryObject,
            page: response.data.nextPage,
        }));
        setDisplayItems((dat) => [...dat, ...response.data.resources]);
    };
    return {
        request,
        setError,
        error,
        loading,
        setData,
        setLoading,
        loadListings,
        loadListings_2
    }

}

export default useListings