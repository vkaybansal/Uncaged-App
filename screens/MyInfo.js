import { API, Auth } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../globalData/UserContext";
import { CommunityContext } from "../globalData/ComunityContext";
import { getUsers, listUsers } from "../src/graphql/queries";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import SelectCard from "../styles/selectCard";
import {
  createUserCommunities,
  deleteBooks,
  deleteRequests,
  deleteUserCommunities,
} from "../src/graphql/mutations";
import { ComNavContext } from "../globalData/ComNavContext";

export default function MyInfo() {
  const userData = useContext(UserContext);
  const user = userData.user;
  const communityInfo = useContext(CommunityContext);
  const [comUsers, setComUsers] = useState();
  const communityNavigation = useContext(ComNavContext);
  const [text, setText] = useState("");

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function retrieveUsers() {
    const userComs = communityInfo.currCom.users.items;
    const users = await Promise.all(
      userComs.map(async (user) => {
        return API.graphql({
          query: getUsers,
          variables: { uId: user.usersCommunitiesUId },
        });
      })
    );
    setComUsers(users);
  }

  async function leaveCommunity() {
    const userComs = communityInfo.currCom.users.items;
    const deletedUserCom = userComs.filter(
      (userCom) => userCom.usersCommunitiesUId == user.data.getUsers.uId
    );
    await updateUserComs(deletedUserCom[0]);
    await deleteUserBooks(deletedUserCom[0]);
    communityInfo.updateCommunity(null);
    userData.refreshUser();
    communityNavigation.communityNav.navigate("Communities");
  }

  async function updateUserComs(deletedUserCom) {
    try {
      await API.graphql({
        query: deleteUserCommunities,
        variables: {
          input: {
            id: deletedUserCom.id,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  async function deleteUserBooks(userCom) {
    const userBooks = user.data.getUsers.ownBooks.items;
    const userComBooks = userBooks.filter(
      (book) => book.communityBooksCId == userCom.communityUsersCId
    );
    await Promise.all(
      userComBooks.map(async (book) => {
        await removeBooks(book);
        await removeBookRequests(book);
      })
    );
  }

  async function removeBooks(book) {
    try {
      await API.graphql({
        query: deleteBooks,
        variables: {
          input: {
            bookId: book.bookId,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  async function removeBookRequests(book) {
    const bookrequests = book.requests.items;
    const deletedRequests = bookrequests.filter((request) => {
      request.usersRequestsUId == user.data.getUsers.uId;
    });

    await Promise.all(
      deletedRequests.map(async (request) => {
        try {
          await API.graphql({
            query: deleteRequests,
            variables: {
              input: {
                id: request.id,
              },
            },
          });
        } catch (evt) {
          console.log(evt);
        }
      })
    );
  }

  useEffect(() => {
    retrieveUsers();
  }, []);

  async function submitHandler() {
    const users = await API.graphql({ query: listUsers });
    const allUsers = users.data.listUsers.items;
    let validAnswer = false;
    let validUser = {};
    allUsers.map((allUser) => {
      if (text.toLowerCase() == allUser.userName.toLowerCase()) {
        validAnswer = true;
        validUser = allUser;
      }
    });
    comUsers.map((comUser) => {
      if (text.toLowerCase() == comUser.data.getUsers.userName.toLowerCase()) {
        validAnswer = false;
      }
    });
    if (validAnswer) {
      await addUserToCommunity(validUser);
      Alert.alert(text + " has been added to the community!");
      setText("");
      await retrieveUsers();
    } else
      Alert.alert(
        "Invalid User: this user does not exist or already is in the community."
      );
  }

  async function addUserToCommunity(user) {
    try {
      await API.graphql({
        query: createUserCommunities,
        variables: {
          input: {
            communityUsersCId: communityInfo.currCom.cId,
            usersCommunitiesUId: user.uId,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  return (
    <View
      style={{
        ...globalStyles.container,
        padding: 0,
        backgroundColor: "#E2CFC2",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.topBar}>
          <Ionicons name="md-person-circle-outline" color="#E2CFC2" size={75} />
          <Text style={styles.titleText}>{user.data.getUsers.userName}</Text>
          <Pressable
            onPress={() => {
              Alert.alert(
                "Sign out?",
                "are you sure you would like to sign out?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      await signOut();
                    },
                  },
                  { text: "No" },
                ]
              );
            }}
          >
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.userTitleText}>
        {communityInfo.currCom.cName + " users"}
      </Text>
      <FlatList
        data={comUsers}
        numColumns={2}
        renderItem={({ item }) => (
          <SelectCard>
            <Text style={styles.usernames}> {item.data.getUsers.userName}</Text>
          </SelectCard>
        )}
      />

      <ScrollView style={{ marginTop: -150 }}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#A48578"
          placeholder="Add a User"
          onChangeText={(text) => setText(text)}
        />
        {text != "" && (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={async () => {
              await submitHandler();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          backgroundColor: "#c7b2a3",
        }}
      >
        <Pressable
          style={styles.bottom}
          onPress={() => {
            communityNavigation.communityNav.navigate("Communities");
          }}
        >
          <Text style={styles.buttonText}>Communities</Text>
        </Pressable>
        <Pressable
          style={styles.bottom}
          onPress={() => {
            Alert.alert(
              "Leave Community",
              "are you sure you would like to leave " +
                communityInfo.currCom.cName +
                "?",
              [
                {
                  text: "Yes",
                  onPress: async () => {
                    await leaveCommunity();
                  },
                },
                { text: "No" },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>
            {"leave " + communityInfo.currCom.cName}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    ...globalStyles.input,
    borderColor: "#A48578",
    fontSize: 20,
    backgroundColor: "#E2CFC2",
    color: "#56494C",
    padding: 15,
  },
  topBar: {
    flex: 1,
    marginTop: -30,
    height: 200,
    backgroundColor: "#56494C",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  userTitleText: {
    fontFamily: "quicksand-bold",
    fontSize: 25,
    color: "#6e4732",
    marginLeft: 10,
    marginTop: 10,
  },
  titleText: {
    ...globalStyles.titleText,
    color: "#E2CFC2",
    marginTop: 0,
  },
  text: {
    fontFamily: "quicksand-bold",
    color: "#9DAFD2",
    fontSize: 20,
    marginTop: 5,
  },
  usernames: {
    color: "#E2CFC2",
    marginHorizontal: 20,
    fontFamily: "quicksand-bold",
    fontSize: 18,
    fontWeight: "100",
  },
  bottom: {
    justifyContent: "center",
    height: 40,
    borderWidth: 2,
    borderColor: "#A48578",
    borderRadius: 20,
    marginHorizontal: 7,
  },

  buttonText: {
    color: "#6e4732",
    fontSize: 20,
    fontFamily: "quicksand-normal",
    paddingVertical: 25,
    paddingHorizontal: 12,
    marginBottom: 25,
  },
  submitButton: {
    justifyContent: "center",
    height: 40,
    width: 100,
    borderWidth: 2,
    borderColor: "#A48578",
    borderRadius: 20,
    margin: 20,
  },
});
