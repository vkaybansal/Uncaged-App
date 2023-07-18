import { StyleSheet, Text, Modal, Image, Alert, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { updateBooks, createRequests } from "../src/graphql/mutations";
import { API } from "aws-amplify";
import { getUsers } from "../src/graphql/queries";
import { useContext } from "react";
import { UserContext } from "../globalData/UserContext";

export default function RequestBook({
  modalOpen,
  setModalOpen,
  item,
  refresh,
}) {
  const userData = useContext(UserContext);
  const user = userData.user;
  // updates the status of a requested book and sets it to "requested"
  async function changeStatus() {
    try {
      await API.graphql({
        query: updateBooks,
        variables: {
          input: {
            bookId: item.bookId,
            status: "requested",
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  // creates a new request with the id of the requested user and the id of the book they requested
  async function newRequest() {
    try {
      await API.graphql({
        query: createRequests,
        variables: {
          input: {
            usersRequestsUId: user.data.getUsers.uId,
            booksRequestsBookId: item.bookId,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  // finds the owner of the book using their id stored with the book in order to display their
  // name and info.
  async function getOwner() {
    const owner = await API.graphql({
      query: getUsers,
      variables: { uId: item.usersOwnBooksUId },
    });
    return owner.data.getUsers;
  }

  async function alertHandler() {
    setModalOpen(false);
    const validReq = checkValidRequest();
    if (validReq) {
      await changeStatus();
      await newRequest();
      refresh();
      Alert.alert(
        "request sent!",
        "A request has been sent to the owner of this book",
        { text: "OK" }
      );
      const owner = await getOwner();
      sendPushNotif(owner);
    } else {
      Alert.alert("already requested!", "you have already requested this book");
    }
  }

  function checkValidRequest() {
    const userRequests = user.data.getUsers.requests.items;
    let valid = true;
    //Vikas: what are we validating here?  Can we also check if the status of the book has not been changed to requested by other users?
    userRequests.map((request) => {
      if (item.bookId == request.booksRequestsBookId) valid = false;
    });
    return valid;
  }

  function sendPushNotif(reciever) {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // converts a js object into a JSON string
        to: reciever.pushToken,
        title: "a book was requested!",
        body: "a user has requested to borrow one of your books. Let them borrow it?",
      }),
    });
  }

  return (
    <Modal visible={modalOpen} animationType="slide">
      <View style={{ backgroundColor: "#E2CFC2", flex: 1 }}>
        <ScrollView>
          <MaterialIcons
            name="close"
            size={30}
            style={styles.modalClose}
            onPress={() => setModalOpen(false)}
          />
          <Text
            style={{
              ...globalStyles.titleText,
              fontFamily: "fasthand",
              fontSize: 40,
              backgroundColor: "#A48578",
            }}
          >
            {item.title}
          </Text>

          <Text style={globalStyles.subtitleText}>{item.Author}</Text>
          <Image
            style={styles.imageStyle}
            source={{ width: 300, height: 500, uri: item.Image }}
          />
          <View style={{ backgroundColor: "#c4a395", marginTop: 20 }}>
            <Text style={{ ...globalStyles.paragraph, marginTop: 5 }}>
              {item.description}
            </Text>
          </View>
          <Text
            style={{
              ...globalStyles.paragraph,
              marginTop: 15,
              fontFamily: "quicksand-bold",
              fontSize: 20,
              color: "#506794",
            }}
          >
            {item.status}
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={{
            paddingBottom: "5%",
            paddingTop: "2%",
            justifyContent: "center",
            backgroundColor: "#c9b3a3",
          }}
          onPress={() =>
            Alert.alert(
              "Confirm Your Choice",
              'Send request to owner for "' + item.title + '"?',
              [
                { text: "Yes", onPress: async () => alertHandler() },
                { text: "No" },
              ]
            )
          }
        >
          <Ionicons
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              color: "#492C1D",
            }}
            name="exit-outline"
            size={40}
          />
          <Text style={{ textAlign: "center", color: "#492C1D" }}>REQUEST</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalClose: {
    marginTop: 50,
    color: "#492C1D",
    marginHorizontal: 10,
  },
  modalContent: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    // display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    borderRadius: 20,
    borderColor: "#A48578",
    borderWidth: 10,
    marginTop: 5,
  },
});
