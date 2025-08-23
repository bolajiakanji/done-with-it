import { Text, } from "react-native";

const ListingsFooter = ({ displayItems, isLoading, listingsQueryObject }) => {
    if (isLoading && displayItems?.length > 0) {
        return (
            <Text style={{ textAlign: "center", paddingBottom: 10, backgroundColor: '#e6f2ff' }}>
                Loading...</Text>
        );
    }
    if (!isLoading && !listingsQueryObject.page && displayItems.length === 0) {
        return (
            <Text style={{
                textAlign: "center", paddingBottom: 10, marginTop: 20

            }}>
                No Data
            </Text>
        );
    }
    if (!isLoading && !listingsQueryObject.page) {
        return (
            <Text style={{
                textAlign: "center", paddingBottom: 10,
            }}>
                No more Data
            </Text>
        );
    }

}

export default ListingsFooter