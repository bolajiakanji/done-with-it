import { StyleSheet, View } from "react-native"
import ListingHeader from "./ListingHeader"
import AppText from "../../components/Text"
// import Skeleton from "../screens/Skeleton"
import ListingFilterings from "../screens/ListingFilterings"
import useAuth from "../auth/useAuth"
import AppButton from "./Button"
import colors from "../config/colors"
import PopUp from "./PopUp"

const Flatlist_header = ({
  loadListings,
  listingsQueryObject,
  setListingsQueryObject,
  displayItems,
  setDisplayItems,
  loading,
  setData,
  error,
  request
}) => {
  const { user } = useAuth();

  return (
    <>
      <View style={styles.container}>
        <ListingHeader user={user} />
         <PopUp message={error} /> 
                    

        {/* {loading && <Skeleton />} */}

        {!loading &&
          <ListingFilterings
            listingsQueryObject={listingsQueryObject}
            setListingsQueryObject={setListingsQueryObject}
            displayItems={displayItems}
            setDisplayItems={setDisplayItems}
            request={request}
            setData={setData}
          />}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    backgroundColor: colors.primary,
  },
  error: {
    color: "red",
    marginTop: 10
  },


})

export default Flatlist_header
