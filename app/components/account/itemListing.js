import { StyleSheet, View } from "react-native";
import { ListItem } from "../lists";
import colors from "../../config/colors";
import Icon from "../Icon";

function ItemListing({ user, logOut }) {
    return (
        <View style={styles.container}>
            <ListItem
                title="My Listings"
                subTitle={`${user.userListings || 0} items available for sale`}
                IconComponent={
                    <Icon
                        name="format-list-bulleted"
                        backgroundColor={colors.primary}
                    />}
            />

            <ListItem
                title="Log Out"
                IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
                onPress={() => logOut()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
container: {
        marginVertical: 5,
    },
    
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default ItemListing