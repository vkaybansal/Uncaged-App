import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../styles/Card";
import { globalStyles } from "../styles/globalStyles";
import BorrowedBookInfo from "./BorrowedBookInfo";
import { UserContext } from "../globalData/UserContext";
import { BooksContext } from "../globalData/BooksContext";

export default function BooksBorrowed({ navigation }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]); // state that contains the books that a user has borrowed
  const [modalOpen, setModalOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState({});
  const userData = useContext(UserContext);
  const user = userData.user;
  const booksData = useContext(BooksContext);

  // retrieves the books that the user borrowed by retrieving the cognito user id
  // and using that to find the corresponding user in the data base. Borrowedbooks is set
  // to the books borrowed under the user's name.
  useEffect(() => {
    retrieveBorrowedBooks();
  }, [booksData.books]);

  // filters based on community and borrow ID
  function retrieveBorrowedBooks() {
    const filteredBooks = booksData.books.filter(
      (book) => book.usersBorrowedBooksUId == user.data.getUsers.uId
    );
    setBorrowedBooks(filteredBooks);
  }

  return (
    <ImageBackground
      style={globalStyles.container}
      resizeMode="cover"
      source={require("../assets/background.png")}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        {/* refresh button displayed at the top of the page */}
        <TouchableOpacity
          style={globalStyles.refreshStyle}
          onPress={() => {
            booksData.refreshBooks();
            Alert.alert("refreshed!");
          }}
        >
          <Text style={globalStyles.refreshButtonText}>refresh</Text>
        </TouchableOpacity>

        <BorrowedBookInfo
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          item={itemClicked}
          retrieveBorrowedBooks={() => {
            booksData.refreshBooks();
          }}
        />
        {/* displays all of the books the user has borrowed using a flatlist to traverse borrowedBooks.
          If a book is pressed, the user is presented with the option to return the book. If they do so,
          returnBook is called and both this page and the home page are refreshed. The user is navigated
          back to the homepage. 
      */}
      </View>
      <FlatList
        numColumns={1}
        data={borrowedBooks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setModalOpen(true);
              setItemClicked(item);
            }}
          >
            {/* displays the info for the book using a card layout */}
            <Card
              uri={item.Image}
              title={item.title}
              authors={item.Author}
              status={item.status}
              user={item.usersOwnBooksUId}
              owner={true}
            />
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}
