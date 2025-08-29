function displayPicture() {
    return(<TouchableOpacity
          underlayColor={colors.light}
          onPress={() => setImageModal(true)}
        >
          <View style={{ width: "100%", height: 200 }}>
            {!image ? (
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  backgroundColor: "#bbb",
                  height: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name="account"
                  size={40}
                  color="gray"
                  style={[
                    {
                      borderRadius: 50,
                      padding: 25,
                      backgroundColor: "black",
                    },
                  ]}
                />
              </View>
            ) : (
              <AdvancedImage
                cldImg={profileImage}
                style={[{ width: "100%", height: "100%" }]}
              />
            )}

            <MaterialCommunityIcons
              size={30}
              name="camera"
              style={{ position: "absolute", top: 5, right: 15 }}
            />
          </View>
        </TouchableOpacity>

        )}