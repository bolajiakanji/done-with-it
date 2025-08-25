import { Text, } from "react-native";

const ListingsFooter = ({ displayItems, isLoading, listingsQueryObject }) => {
    if (isLoading && displayItems?.length > 0) {
        return (
            <Text style={styles.loading}>
                Loading...</Text>
        );
    }

    if (!isLoading && !listingsQueryObject.page && displayItems.length === 0) {
        return (
            <Text style={styles.noData}>
                No Data
            </Text>
        );
    }
    
    if (!isLoading && !listingsQueryObject.page) {
        return (
            <Text style={styles.noMoreData}>
                No more Data
            </Text>
        );
    }

}

const styles = StyleSheet.create({
    loading: {
        textAlign: "center",
        paddingBottom: 10,
        backgroundColor: '#e6f2ff'
    },

    noData: {
        textAlign: "center",
        paddingBottom: 10,
        marginTop: 20
    },

    noMoreData: {
        textAlign: "center",
        paddingBottom: 10
    }
})

export default ListingsFooter