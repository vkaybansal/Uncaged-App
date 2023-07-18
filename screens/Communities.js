import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import NewCommunity from "./NewCommunity";
import { getCommunity } from "../src/graphql/queries";
import { API, Auth } from "aws-amplify";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import CommunityCard from "../styles/CommunityCard";
import { UserContext } from "../globalData/UserContext";
import { CommunityContext } from "../globalData/ComunityContext";
import { ComNavContext } from "../globalData/ComNavContext";

export default function Communities({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false); // used to check whether the add community page should be shown or not.
  const [myCommunities, setMyCommunities] = useState(); // the communities that the user is in
  const userData = useContext(UserContext);
  let user = {};
  if (userData != null) user = userData.user;
  const communityData = useContext(CommunityContext);
  const communityNavigation = useContext(ComNavContext);

  // retrieves all of the communities the user is in using userCommunities when initially rendered.
  useEffect(() => {
    if (user != null) {
      fetchCommunities();
    }
  }, [user]); // find better method in order to get it to reload

  async function fetchCommunities() {
    const communities = user.data.getUsers.communities.items;

    // ALSO NECESSARY: no way to access communities underneath a user as userCommunities only has access to community IDs.
    const userCommunities = await Promise.all(
      communities.map(async (com) => {
        return API.graphql({
          query: getCommunity,
          variables: { cId: com.communityUsersCId },
        });
      })
    );
    setMyCommunities(userCommunities);
  }

  function welcomeMessage() {
    if (user != null && user.data.getUsers != null)
      return "Welcome " + user.data.getUsers.userName + "!";
    return "Welcome!";
  }

  return (
    <LinearGradient colors={["#F3E3D8", "#fcf6f2"]} style={{ flex: 1 }}>
      <Image source={require("../assets/bookswap.png")} />
      <Text style={styles.titleText}>{welcomeMessage()}</Text>
      <Text style={styles.text}>
        Click on the plus button or on a community to get started!
      </Text>

      <NewCommunity
        modalOpen={modalOpen}
        closeModal={setModalOpen}
        currUser={user}
        refresh={async () => {
          userData.refreshUser();
          await fetchCommunities();
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <MaterialIcons
          name="add"
          color="#56494c"
          size={24}
          style={styles.modalToggle}
          onPress={() => {
            setModalOpen(true);
          }}
        />

        <MaterialIcons
          name="refresh"
          color="#56494c"
          size={24}
          style={styles.modalToggle}
          onPress={async () => {
            userData.refreshUser();
            await fetchCommunities();
            Alert.alert("refreshed!");
          }}
        />
      </View>

      <FlatList
        data={myCommunities}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              communityData.updateCommunity(item);
              navigation.navigate("Drawer");
              communityNavigation.setCommunityNav(navigation);
            }}
          >
            <CommunityCard>
              <Text style={styles.communityName}>
                {" "}
                {item.data.getCommunity.cName}
              </Text>
              <Ionicons
                name="ios-people"
                color="#56494c"
                style={styles.iconStyle}
                size={24}
              />
            </CommunityCard>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingBottom: 60,
          marginTop: 10,
        }}
      >
        <Pressable
          style={styles.bottom}
          onPress={async () => {
            try {
              await Auth.signOut();
            } catch (evt) {
              console.log(evt);
            }
          }}
        >
          <Text style={styles.buttonText}>sign out</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    flexDirection: "row",
    marginBottom: 1,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },

  iconStyle: {
    color: "#492C1D",
  },

  titleText: {
    position: "absolute",
    width: 378,
    height: 71,
    left: 29,
    top: 351,
    fontFamily: "quicksand-bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 38,
    color: "rgba(86, 73, 76, 0.76)",
    marginTop: 20,
  },

  text: {
    right: 100,
    marginTop: 70,
    width: 350,
    left: 29,
    fontFamily: "quicksand-normal",
    fontSize: 20,
    color: "rgba(86, 73, 76, 0.76)",
  },

  communityName: {
    color: "#A48578",
    fontFamily: "quicksand-normal",
    fontSize: 20,
    fontWeight: "100",
  },

  bottom: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderWidth: 2,
    borderColor: "#a48578",
    borderRadius: 20,
  },

  buttonText: {
    color: "#a48578",
    fontSize: 20,
    fontFamily: "quicksand-normal",
    padding: 25,
    marginBottom: 25,
  },
});
