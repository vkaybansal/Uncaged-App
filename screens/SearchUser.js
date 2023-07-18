import { API } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { UserContext } from "../globalData/UserContext";
import { listUsers } from "../src/graphql/queries";
import ItemsCard from "../styles/ItemsCard";
import { Ionicons } from "@expo/vector-icons";
import SelectCard from "../styles/selectCard";
import { globalStyles } from "../styles/globalStyles";

export default function SearchUser({ submitHandler }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState();
  const [usersSelected, setUsersSelected] = useState([]);
  const userData = useContext(UserContext);
  const user = userData.user;

  async function fetchAllUsers() {
    const getUsers = await API.graphql({ query: listUsers });
    const allUsers = getUsers.data.listUsers.items;
    setUsers(allUsers);
  }

  useEffect(() => {
    async function fetchUsers() {
      await fetchAllUsers();
    }
    fetchUsers();
  }, []);

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

  return (
    <View>
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
                <Text style={globalStyles.paragraph}>{item.userName}</Text>
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
              <Text style={globalStyles.subtitleText}>{item.userName}</Text>
            </ItemsCard>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Pressable
        style={styles.buttonStyle}
        onPress={() => {
          setUsersSelected([]);
          submitHandler();
        }}
      >
        <Text style={styles.buttonText}>submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
