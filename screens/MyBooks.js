import { API } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BooksContext } from "../globalData/BooksContext";
import { UserContext } from "../globalData/UserContext";
import { deleteBooks } from "../src/graphql/mutations";
import Card from "../styles/Card";
import { globalStyles } from "../styles/globalStyles";
import MyBookInfo from "./MyBookInfo";

export default function MyBooks() {
  const [mybooks, setMyBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState({});
  const [requests, setRequests] = useState();
  const userData = useContext(UserContext);
  const booksData = useContext(BooksContext);

  // filters w community and book owner
  function filterBooks() {
    // booksData.refreshBooks();
    const myBooks = booksData.books.filter(
      (book) => book.usersOwnBooksUId == userData.user.data.getUsers.uId
    );
    setMyBooks(myBooks);
  }

  // ensures that books are only retrieved once (no infinite loop)
  useEffect(() => {
    filterBooks();
  }, [booksData.books]);

  // if a user decides to remove a book, the deleteBook mutation is called and
  // the current book that the user has clicked on is deleted.
  async function removeBook() {
    try {
      await API.graphql({
        query: deleteBooks,
        variables: {
          input: {
            bookId: item.bookId,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  return (
    <ImageBackground
      style={globalStyles.container}
      resizeMode="cover"
      source={require("../assets/background.png")}
    >
      {/* renders the button to the center of the screen */}
      <View style={{ alignItems: "center" }}>
        {/* refresh button at the top of the page. Whenever it is clicked, retrieveBooks is called once again
        in order to update the status of the books that are shown. An alert is thrown letting the user know of the changes*/}
        <TouchableOpacity
          style={globalStyles.refreshStyle}
          onPress={() => {
            booksData.refreshBooks();
            Alert.alert("refreshed!");
          }}
        >
          <Text style={globalStyles.refreshButtonText}>refresh</Text>
        </TouchableOpacity>
      </View>

      {/* the component that renders the screen that shows up whenever a book is clicked. Passes
      modal options, removeBook and the requests of the current book to the component */}
      <MyBookInfo
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        item={item}
        removeBook={async () => {
          await removeBook();
          booksData.refreshBooks();
        }}
        requests={requests}
        refresh={() => {
          booksData.refreshBooks();
        }}
      />
      {/* renders each book individually with the Card layout defined in the Card component. Each book
        is pressable and if clicked, the modal containing the MyBookInfo screen is shown and the item
        clicked is updated. the requests of the item are also updates in order to update the info shown
        in MyBooksInfo */}
      <FlatList
        numColumns={1}
        data={mybooks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => {
              setModalOpen(true);
              setItem(item);
              setRequests(item.requests.items);
            }}
          >
            <Card
              uri={item.Image}
              title={item.title}
              authors={item.Author}
              status={item.status}
              user={item.usersBorrowedBooksUId}
              owner={false}
            />
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}
