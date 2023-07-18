import { useContext, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../styles/Card";
import { globalStyles } from "../styles/globalStyles";
import RequestBook from "./RequestBook";
import { UserContext } from "../globalData/UserContext";
import { ComNavContext } from "../globalData/ComNavContext";
import { BooksContext } from "../globalData/BooksContext";
import { CommunityContext } from "../globalData/ComunityContext";

// NOTE: code is repetitive --> same flatlist/retrieval book is used in multiple areas
export default function Home({ navigation }) {
  const [itemClicked, setItemClicked] = useState({});
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const communityNavigation = useContext(ComNavContext);
  const userData = useContext(UserContext);
  const booksData = useContext(BooksContext);

  useEffect(() => {
    if (booksData.books != null) getCommunityBooks();
    else booksData.refreshBooks();
  }, [booksData.books]);

  //vikas: every time user come to My books screen, will the query fire fresh
  // to the db or see any new books added or some books taken taken off?
  function getCommunityBooks() {
    const filteredBooks = booksData.books.filter(
      (book) =>
        book.status != "borrowed" &&
        book.usersOwnBooksUId != userData.user.data.getUsers.uId
    );
    setBooks(filteredBooks);
  }

  return (
    <ImageBackground
      style={globalStyles.container}
      resizeMode="cover"
      source={require("../assets/background.png")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={globalStyles.refreshStyle}
          onPress={() => {
            booksData.refreshBooks();
            Alert.alert("refreshed!");
          }}
        >
          <Text style={globalStyles.refreshButtonText}>refresh</Text>
        </TouchableOpacity>

        <TouchableOpacity // create a better style (different button from refersh)
          style={globalStyles.refreshStyle}
          onPress={() => {
            communityNavigation.communityNav.navigate("Communities");
          }}
        >
          <Text style={globalStyles.refreshButtonText}>Communities</Text>
        </TouchableOpacity>
      </View>
      <RequestBook
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        item={itemClicked}
        navigateToMyBooks={() => {
          navigation.navigate("My Books");
        }}
        refresh={() => {
          booksData.refreshBooks();
        }}
      />
      <FlatList
        numColumns={1}
        data={books}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setModalOpen(true);
              setItemClicked(item);
            }}
          >
            <Card
              uri={item.Image}
              title={item.title}
              status={item.status}
              user={item.usersOwnBooksUId}
              owner={true}
              authors={item.Author}
            />
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    flex: 1,
    paddingLeft: 10,
    paddingTop: 60,
  },
});
