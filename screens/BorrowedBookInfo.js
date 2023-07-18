import { StyleSheet, Text, Modal, Image, Alert, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { updateBooks, updateTransactions } from "../src/graphql/mutations";
import { API, Auth } from "aws-amplify";
import { getBooks, listBooks } from "../src/graphql/queries";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../globalData/UserContext";

export default function BorrowedBookInfo({
  modalOpen,
  setModalOpen,
  item,
  retrieveBorrowedBooks,
}) {
  const [itemTransaction, setItemTransaction] = useState({});
  const userData = useContext(UserContext);
  const user = userData.user;

  async function retrieveTransactionInfo() {
    const book = await API.graphql({
      query: getBooks,
      variables: { bookId: item.bookId },
    });
    const transactions = book.data.getBooks.bookTransactions.items;
    const transaction = transactions.filter(
      (tran) =>
        tran.usersBorrowerTransactionsUId == user.data.getUsers.uId &&
        tran.returnedDate == null
    );
    if (transaction.length < 1) setItemTransaction({});
    else setItemTransaction(transaction[0]);
  }

  // calls retrieveTransactionInfo every time that modalOpen changes
  useEffect(() => {
    if (item.bookId != null) retrieveTransactionInfo();
    if (new Date() == new Date(itemTransaction.dueDate)) sendNotification();
  }, [modalOpen]);

  function sendNotification() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // converts a js object into a JSON string
        to: user.data.getUsers.pushToken,
        title: "your borrowed book is due!",
        body:
          item.title + " is due today! Please return it as soon as possible.",
      }),
    });
  }

  // in order to return a specific book, it is passed to the function and
  // the updateBooks mutation is used in order to change the status from
  // borrowed to available. The user id of the borrower is also set to null.
  async function returnBook(item) {
    try {
      await API.graphql({
        query: updateBooks,
        variables: {
          input: {
            bookId: item.bookId,
            status: "available",
            usersBorrowedBooksUId: null,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  async function updateTransaction() {
    const date = new Date().toLocaleDateString();
    try {
      await API.graphql({
        query: updateTransactions,
        variables: {
          input: {
            id: itemTransaction.id,
            type: "returned",
            returnedDate: date,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
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
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.imageStyle}
              source={{ width: 190, height: 290, uri: item.Image }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...globalStyles.titleText,
                  fontSize: 30,
                  marginTop: 30,
                }}
              >
                {item.title}
              </Text>
              <Text style={globalStyles.subtitleText}>{item.Author}</Text>
              <Text
                style={{
                  ...globalStyles.paragraph,
                  color: "#895737",
                  marginTop: 20,
                }}
              >
                {"date borrowed: " +
                  itemTransaction.borrowdate +
                  "\n\n" +
                  "due on: " +
                  itemTransaction.dueDate}
              </Text>
              <Text
                style={{
                  ...globalStyles.paragraph,
                  fontFamily: "quicksand-bold",
                  color: "red",
                  marginTop: 20,
                }}
              >
                {new Date() >= new Date(itemTransaction.dueDate) &&
                  "BOOK IS DUE!"}
              </Text>
            </View>
          </View>
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
              "Return " + item.title,
              "Would you like to return this book?",
              [
                {
                  text: "Yes",
                  onPress: async () => {
                    await returnBook(item);
                    await updateTransaction();
                    retrieveBorrowedBooks();
                    Alert.alert("returned!");
                    setModalOpen(false);
                  },
                },
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
            name="return-up-back-outline"
            size={40}
          />
          <Text style={{ textAlign: "center", color: "#492C1D" }}>
            RETURN BOOK
          </Text>
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
    marginLeft: 10,
    borderRadius: 10,
    borderColor: "#A48578",
    borderWidth: 4,
    marginTop: 30,
  },
});
