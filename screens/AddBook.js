import { API } from "aws-amplify";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { createBooks } from "../src/graphql/mutations";
import { globalStyles } from "../styles/globalStyles";
import { useContext, useState } from "react";
import SearchBook from "./SearchBook";
import { UserContext } from "../globalData/UserContext";
import { CommunityContext } from "../globalData/ComunityContext";
import { getUsers } from "../src/graphql/queries";

export default function AddBook() {
  const [picture, setPicture] = useState(
    <Image
      source={require("../assets/default.png")}
      style={{ width: 175, height: 250, borderRadius: 10 }}
    />
  );
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [synopsis, setSynopsis] = useState();
  const [uri, setURI] = useState();
  const userData = useContext(UserContext);
  const user = userData.user;
  const communityData = useContext(CommunityContext);

  // whenever you need to access some third party process (ex: access database, api, etc.), you need to make
  // a PROMISE -> tells the program that it needs to wait for the process to complete (since front end compiles immediately
  // but the backend/other processes require some more time). This is done by defining the function that calls
  // the api as ASYNC along with the caller of the function. This tells React that the function is making a
  // promise. Then within the function, use the keyword 'await' for the process itself.
  async function addBookDataHandler() {
    try {
      await API.graphql({
        query: createBooks,
        variables: {
          input: {
            bookId: Math.random().toString(), // figure out better way to do this -> may cause repeat keys
            title: title,
            description: synopsis,
            Author: author,
            Image: uri,
            status: "available",
            usersOwnBooksUId: user.data.getUsers.uId,
            communityBooksCId: communityData.currCom.cId,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  function handleSynopsisChange(text) {
    if (text.length > 700) {
      Alert.alert("please enter a synopsis less than 700 characters");
    } else {
      setSynopsis(text);
    }
  }

  function handleBookPressed(item) {
    setTitle(item.volumeInfo.title);
    setURI(item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail);
    setPicture(
      <Image
        source={{
          width: 175,
          height: 250,
          borderRadius: 10,
          uri:
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail,
        }}
      />
    );
    setSynopsis(item.volumeInfo.description.substring(0, 700));

    let stringAuthor = "";
    const authors = item.volumeInfo.authors;
    authors.map((author) => (stringAuthor += author));
    setAuthor(stringAuthor);
  }

  async function handleSubmit() {
    if (
      title != null &&
      author != null &&
      synopsis != null &&
      title.trim() != "" &&
      author.trim() != "" &&
      synopsis.trim() != ""
    ) {
      Alert.alert("your book has been added!");
      addBookDataHandler();
      setTitle("");
      setAuthor("");
      setSynopsis("");
      setURI("");
      setPicture(
        <Image
          source={require("../assets/default.png")}
          style={{ width: 175, height: 250 }}
        />
      );
      userData.refreshUser(); // must be refreshed in order to retrieve new books that the user may have added
      await retrieveCommunityUsers();
    } else
      Alert.alert(
        "please make sure you have filled out all fields and linked a valid image."
      );
  }

  async function retrieveCommunityUsers() {
    const userComs = communityData.currCom.users.items;
    // NECESSARY:  no other way to access the info underneath a user since userCommunities only has access to the uId
    await Promise.all(
      userComs.map(async (userIndex) => {
        const userInfo = await API.graphql({
          query: getUsers,
          variables: { uId: userIndex.usersCommunitiesUId },
        });
        if (userInfo.data.getUsers.uId != user.data.getUsers.uId)
          sendPushNotif(userInfo.data.getUsers);
        return userInfo;
      })
    );
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
        title: "A book has been added!",
        body:
          title +
          " has been added by " +
          user.data.getUsers.userName +
          " in your community " +
          communityData.currCom.cName +
          ". Click to view and borrow.",
      }),
    });
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/background.png")}
      style={{
        ...globalStyles.container,
        backgroundColor: "#E2CFC2",
        paddingHorizontal: 10,
      }}
    >
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          {picture}
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#A48578"
              placeholder="Book Title"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />

            <TextInput
              style={styles.input}
              placeholderTextColor="#A48578"
              placeholder="Author Name"
              onChangeText={(text) => setAuthor(text)}
              value={author}
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Synposis"
          placeholderTextColor="#A48578"
          multiline
          onChangeText={(text) => handleSynopsisChange(text)}
          value={synopsis}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#A48578"
          placeholder="Insert a link of your Image"
          onChangeText={(text) => setURI(text)}
          value={uri}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <SearchBook
            bookPressed={(item) => handleBookPressed(item)}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonText}
          />
          <TouchableOpacity
            onPress={async () => await handleSubmit()}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  input: {
    ...globalStyles.input,
    borderColor: "#A48578",
    fontSize: 15,
    backgroundColor: "#E2CFC2",
    color: "#56494C",
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: "#A48578",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 15,
  },
  buttonText: {
    color: "#E2CFC2",
    fontFamily: "quicksand-bold",
  },
});
