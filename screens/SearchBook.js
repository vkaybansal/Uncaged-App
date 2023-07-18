import { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../styles/globalStyles";
import axios from "axios";
import Card from "../styles/Card";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchBook(props) {
  const [modalOpen, setModalOpen] = useState(false); // controls whether the screen is open or not
  const [searchedBooks, setSearchedBooks] = useState(); // state updated with the matching results of what is typed

  // uses the google books API in order to find all the books in the google books data base
  // that matches the keywords that were passed into the function. Updates the state with the books
  // found.
  async function findBooks(search) {
    if (search != "") {
      const matchedBooks = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          search +
          "&key=AIzaSyCoEmE4YXnCXAYKnqtAqrQAC8q6Fdka3JQ"
      );
      const allBooks = matchedBooks.data.items;

      setSearchedBooks(allBooks);
      // allBooks.map((book) => console.log(book.id));
    }
  }

  return (
    <View>
      {/* button that allows the user to search for a book: opens the screen if pressed */}
      <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={props.buttonStyle}
      >
        <Text style={props.textStyle}>SEARCH FOR A BOOK</Text>
      </TouchableOpacity>

      {/* Screen that allows the user to search for a book */}
      <Modal visible={modalOpen} animationType="slide">
        <LinearGradient colors={["#66524a", "#332b2d"]} style={{ flex: 1 }}>
          {/* 'X' Icon that closes the screen*/}
          <MaterialIcons
            name="close"
            size={30}
            style={styles.modalClose}
            onPress={() => setModalOpen(false)}
          />

          {/* The text input used to search for a book. Every time the text updates,
          findBooks is called with the keyword passed in. */}
          <TextInput
            style={{ ...globalStyles.input }}
            placeholder="Search for Books"
            onChangeText={async (text) => {
              await findBooks(text);
            }}
          />
          {/* displays all the books that match the results using a card view. The card is passed
          the uri for the cover of the book as well as the book's title and author. If a book is 
          pressed, the parent component is called and that book is passed to it. The screen
          is then closed. */}
          <View style={{ flexDirection: "row" }}>
            <FlatList
              numColumns={1}
              data={searchedBooks}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    props.bookPressed(item);
                    setModalOpen(false);
                  }}
                >
                  <Card
                    uri={
                      item.volumeInfo.imageLinks &&
                      item.volumeInfo.imageLinks.smallThumbnail
                    }
                    title={item.volumeInfo.title}
                    authors={item.volumeInfo.authors}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalClose: {
    marginTop: 60,
    color: "#E2CFC2",
    marginHorizontal: 10,
  },
});
