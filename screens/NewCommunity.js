import { API } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  Pressable,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  createCommunity,
  createUserCommunities,
} from "../src/graphql/mutations";
import { globalStyles } from "../styles/globalStyles";
import { listUsers } from "../src/graphql/queries";
import SelectCard from "../styles/selectCard";
import { LinearGradient } from "expo-linear-gradient";
import ItemsCard from "../styles/ItemsCard";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../globalData/UserContext";

export default function NewCommunity({
  modalOpen,
  closeModal,
  refresh,
  currUser,
}) {
  const [communityName, setCommunityName] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState();
  const [usersSelected, setUsersSelected] = useState([]);

  async function fetchAllUsers() {
    const getUsers = await API.graphql({ query: listUsers });
    const allUsers = getUsers.data.listUsers.items;
    const allOtherUsers = allUsers.filter(
      (user) => user.uId != currUser.data.getUsers.uId
    );
    setUsers(allOtherUsers);
  }

  async function makeCommunity() {
    try {
      const newCommunity = await API.graphql({
        query: createCommunity,
        variables: {
          input: {
            cId: Math.random().toString(),
            cName: communityName,
          },
        },
      });
      return newCommunity.data.createCommunity;
    } catch (evt) {
      console.log(evt);
    }
  }

  async function makeUserCommunities(community, user) {
    try {
      await API.graphql({
        query: createUserCommunities,
        variables: {
          input: {
            communityUsersCId: community.cId,
            usersCommunitiesUId: user.uId,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      if (currUser != null) await fetchAllUsers();
    }
    fetchUsers();
  }, [currUser]);

  function findUsers(text) {
    setFilteredUsers(
      users.filter(
        (user) => user.userName.toLowerCase().indexOf(text.toLowerCase()) == 0
      )
    );
  }

  function selectedUserHandler(selectedUser) {
    if (usersSelected.length > 0)
      setUsersSelected((current) => [...current, selectedUser]);
    else setUsersSelected([selectedUser]);
    const remainingUsers = users.filter((user) => user.uId != selectedUser.uId);
    setUsers(remainingUsers);
    findUsers("reset");
  }

  function removeUserHandler(removedUser) {
    setUsersSelected(
      usersSelected.filter((user) => user.uId != removedUser.uId)
    );
    setUsers((current) => [...current, removedUser]);
  }

  async function submitHandler() {
    if (
      communityName != "" &&
      usersSelected.length > 0 &&
      communityName.length < 14
    ) {
      const community = await makeCommunity();
      usersSelected.map((user) => makeUserCommunities(community, user));
      makeUserCommunities(community, user.data.getUsers);
      Alert.alert("Community created!");

      setUsersSelected([]);
      setCommunityName("");
      closeModal(false);
      await refresh();
    } else {
      Alert.alert(
        "Please enter a community name less than 14 characters and atleast select one valid user"
      );
    }
  }

  return (
    <Modal visible={modalOpen} animationType="slide">
      <ScrollView>
        <LinearGradient
          colors={["#635256", "#332b2d"]}
          style={styles.modalStyle}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Image
              source={require("../assets/cage.png")}
              style={{ marginTop: -20, marginHorizontal: 100 }}
            />

            <Text style={{ ...globalStyles.titleText, color: "#E2CFC2" }}>
              Create a New Community!
            </Text>
            <Text style={{ ...globalStyles.subtitleText, color: "#E2CFC2" }}>
              Free your books with the people you trust!
            </Text>

            <TextInput
              onChangeText={(text) => {
                setCommunityName(text);
              }}
              placeholder="name of your community"
              style={globalStyles.input}
            />

            <TextInput
              placeholder="search for users to add"
              onChangeText={(text) => findUsers(text)}
              style={globalStyles.input}
            />

            <ScrollView>
              {usersSelected.map((item) => (
                <TouchableOpacity
                  key={item.uId}
                  onPress={() => {
                    removeUserHandler(item);
                  }}
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <SelectCard>
                    <Ionicons
                      name="close"
                      color="#56494c"
                      size={24}
                      style={{ marginTop: 5 }}
                    />
                    <View style={{ marginHorizontal: 100 }}>
                      <Text style={globalStyles.paragraph}>
                        {item.userName}
                      </Text>
                    </View>
                  </SelectCard>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView>
              {filteredUsers.map((item) => (
                <TouchableOpacity
                  onPress={() => selectedUserHandler(item)}
                  key={item.uId}
                >
                  <ItemsCard>
                    <Text style={globalStyles.subtitleText}>
                      {item.userName}
                    </Text>
                  </ItemsCard>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Pressable
              style={styles.buttonStyle}
              onPress={async () => {
                await submitHandler();
              }}
            >
              <Text style={styles.buttonText}>submit</Text>
            </Pressable>

            <Pressable
              style={{ ...styles.buttonStyle, borderColor: "#DBA492" }}
              onPress={async () => {
                setUsersSelected([]);
                setCommunityName("");
                closeModal(false);
              }}
            >
              <Text style={{ ...styles.buttonText, color: "#DBA492" }}>
                return
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </ScrollView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 200,
  },
  buttonStyle: {
    width: 158,
    height: 54,
    borderWidth: 5,
    borderColor: "#9DAFD2",
    borderStyle: "solid",
    filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.59))",
    borderRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    fontFamily: "quicksand-bold",
    color: "#9DAFD2",
    fontSize: 20,
  },
});
