import {
  Modal,
  StyleSheet,
  Text,
  Image,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { useContext, useEffect, useState } from "react";
import { getBooks, getUsers } from "../src/graphql/queries";
import { API } from "aws-amplify";
import {
  createTransactions,
  deleteRequests,
  updateBooks,
} from "../src/graphql/mutations";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../globalData/UserContext";

export default function MyBookInfo({
  modalOpen, // whether modal should be open or closed
  setModalOpen, // used to change the state of the modal
  item, // the book that was pressed
  removeBook, // function in order to remove book (if user choses to do so)
  requests, // request ids for the book pressed
  refresh, // DOESNT WORK
}) {
  const [userRequested, setUserRequested] = useState([]);
  const [transaction, setTransaction] = useState({});
  const userData = useContext(UserContext);
  const user = userData.user;

  // STARTS HERE: calls fetchRequestedUsers when component is initially rendered.
  // async function nested in use effect as an async arrow function is invalid -- to await
  // the fetch users call, it must be in an async function so another one was created within
  // the arrow function
  useEffect(() => {
    async function fetchUsers() {
      await fetchRequestedUsers();
    }
    fetchUsers();
    if (item.status == "borrowed") fetchTransaction();
    else setTransaction("");
  }, [modalOpen]);

  async function fetchTransaction() {
    const book = await API.graphql({
      query: getBooks,
      variables: { bookId: item.bookId },
    });
    const transactions = book.data.getBooks.bookTransactions.items;
    const transaction = transactions.filter(
      (tran) =>
        tran.usersOwnerTransactionsUId == user.data.getUsers.uId &&
        tran.returnedDate == null
    );
    if (transaction.length < 1) setTransaction({});
    else setTransaction(transaction[0]);
  }
  // Fetches all of the users who have requested the book using their ids stored
  // in requests. Sets the state to an array of all the users who have requested.
  // If no user has requested, user requested is set to null
  // renders component afterwards
  async function fetchRequestedUsers() {
    if (Object.keys(item).length != 0) {
      //checks whether the book selected has requested users
      let allUsers = "";
      if (requests != null && requests.length != 0) {
        allUsers = await Promise.all(
          requests.map(async (user) => {
            return API.graphql({
              query: getUsers,
              variables: { uId: user.usersRequestsUId },
            });
          })
        );
        setUserRequested(allUsers.map((user) => user.data.getUsers));
      } else setUserRequested([]);
    }
  }

  // uses the query updateBooks in order to change the status of the book selected.
  // The status is updated (either with borrowed or available)
  // and if the book has been borrowed, the id of the borrower  is stored as well.
  async function changeBorrowStatus(value, borrower) {
    try {
      if (value == "borrowed") {
        await API.graphql({
          query: updateBooks,
          variables: {
            input: {
              bookId: item.bookId,
              status: value,
              usersBorrowedBooksUId: borrower.uId,
            },
          },
        });
      } else {
        await API.graphql({
          query: updateBooks,
          variables: {
            input: {
              bookId: item.bookId,
              status: value,
            },
          },
        });
      }
    } catch (evt) {
      console.log(evt);
    }
  }

  // finds all of the requests that have been made under the book selected
  // and calls removeRequests for each one in order to delete them all.
  async function deleteRequest() {
    if (Object.keys(item).length > 0) {
      const requests = item.requests.items;
      if (requests.length > 0)
        await Promise.all(
          requests.map(async (req) => {
            removeRequests(req);
          })
        );
    }
  }

  // uses the delete mutation to remove the request that was passed in.
  async function removeRequests(request) {
    try {
      API.graphql({
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
  }

  // sends a notification to the borrower that their book is ready to borrow.
  function sendPushNotif(reciever, title, body) {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // converts a js object into a JSON string
        to: reciever.pushToken,
        title: title,
        body: body,
      }),
    });
  }

  // if book is approved to be borrowed, a transaction is created with the type
  // borrowed, the current date, the number of days of borrowing, and the id
  // if the book and the borrower.
  async function addBorrowTransaction(borrower, futureDate) {
    const date = new Date().toLocaleDateString();
    await API.graphql({
      query: createTransactions,
      variables: {
        input: {
          type: "borrowed",
          borrowdate: date,
          dueDate: futureDate,
          booksBookTransactionsBookId: item.bookId,
          usersBorrowerTransactionsUId: borrower.uId,
          usersOwnerTransactionsUId: user.data.getUsers.uId,
        },
      },
    });
  }

  function createFutureDate(time) {
    const daysDue = parseInt(time);
    const date = new Date();
    date.setDate(date.getDate() + daysDue);
    return date.toLocaleDateString();
  }
  // if user presses requested books button:
  async function bookRequestHandler() {
    // creates the alert button for each of the users (button text is their username).
    // If the button is pressed, the status of the book changes to borrowed
    // and the selected user's id is stored.
    // All requests are removed.
    // The owner then indicates how long the selected user can borrow the book and
    // creates a transaction accordingly.
    // Sends notification to the user to let them know they can borrow a book.
    // usersRequested is set to empty and component rerenders accordingly.
    let borrowedUsers = userRequested.map((user) => ({
      text: user.userName,
      onPress: async () => {
        await changeBorrowStatus("borrowed", user);
        await deleteRequest();
        Alert.prompt(
          "choose borrow time",
          "how many days would you like the user to borrow the book?",
          async (text) => {
            if (!isNaN(text) && parseInt(text) > 0) {
              const futureDate = createFutureDate(text);
              await addBorrowTransaction(user, futureDate);
              sendPushNotif(
                user,
                "your request was approved!",
                item.title +
                  " was approved to borrow. Check to see the borrowing information for this book"
              );
              Alert.alert(
                user.userName + " has borrowed your book: " + item.title
              );
              setUserRequested([]);
              refresh();
              setModalOpen(false);
            } else
              Alert.alert(
                "Please enter a valid borrow time.",
                "Request did not go through, please accept this request again with a valid borrow time"
              );
          }
        );
      },
    }));

    // Alert button that allows user to deny all requests.
    // Added to the array of button with the requested users.
    // The borrow status is then changed to available and all requests are deleted.
    // The component is rerendered.
    borrowedUsers.push({
      text: "remove requests",
      onPress: async () => {
        await changeBorrowStatus("available");
        await deleteRequest();
        setUserRequested([]);
        refresh();
        setModalOpen(false);
        Alert.alert("requests deleted! Your book is available now");
      },
    });
    borrowedUsers.push({ text: "cancel" });

    // Alert that shows up when user presses "allow requests" button
    Alert.alert(
      "Choose Borrower",
      "select which user you want to borrow this book",
      borrowedUsers
    );
  }

  async function sendBorrowerNotif() {
    const borrower = await API.graphql({
      query: getUsers,
      variables: { uId: item.usersBorrowedBooksUId },
    });
    sendPushNotif(
      borrower.data.getUsers,
      "Please return " + item.title + "!",
      "the owner of this book has requested this book back." +
        " Ensure that it is not overdue. "
    );
  }

  // button that only shows up if there are users who've requested the book.
  let requestButton;
  // if there are users who have requested, the corresponding alert is thrown
  // executed in bookRequestHandler.
  if (userRequested.length > 0)
    requestButton = (
      <TouchableOpacity
        onPress={async () => {
          await bookRequestHandler();
        }}
        style={styles.button}
      >
        <Text style={{ ...globalStyles.subtitleText }}>allow request?</Text>
      </TouchableOpacity>
    );

  return (
    <Modal
      visible={modalOpen}
      animationType="slide"
      style={styles.modalContent}
    >
      <View style={{ backgroundColor: "#E2CFC2", flex: 1 }}>
        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <Ionicons
            name="close"
            size={30}
            style={{ color: "#56494C", marginLeft: 20 }}
            onPress={() => setModalOpen(false)}
          />
          <Ionicons
            name="refresh"
            size={30}
            style={{ color: "#56494C", marginLeft: 20 }}
            onPress={async () => {
              await fetchRequestedUsers();
            }}
          />
        </View>
        <ScrollView>
          <Text
            style={{
              ...globalStyles.titleText,
              fontFamily: "fasthand",
              fontSize: 35,
              color: "#E2CFC2",
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

          <Text style={styles.statusText}>{item.status}</Text>
          {item.status == "borrowed" && typeof transaction != "undefined" && (
            <Text style={globalStyles.subtitleText}>
              {"date borrowed: " +
                transaction.borrowdate +
                "\n\n" +
                "due on: " +
                transaction.dueDate +
                "\n"}
            </Text>
          )}

          {/* displays all of the users who have requested (if there are any) */}
          {userRequested.map((user) => (
            // key required whenever using map function when rendering (knows which obj to refer to)
            <Text key={user.uId} style={styles.requestedUsersText}>
              user requested: {user.userName}
            </Text>
          ))}
          {requestButton}
        </ScrollView>
        {item.status != "borrowed" ? (
          <TouchableOpacity
            style={{
              paddingBottom: "5%",
              paddingTop: "2%",
              justifyContent: "center",
              backgroundColor: "#755f57",
            }}
            onPress={() =>
              Alert.alert(
                "remove this book?",
                "are you sure you would like to delete this book? this action can not be undone",
                [
                  {
                    text: "yes",
                    onPress: async () => {
                      if (item.status == "borrowed")
                        Alert.alert(
                          "Book cannot be deleted while borrowed. Please wait until it is returned."
                        );
                      else {
                        await removeBook();
                        Alert.alert(
                          "Your book has been removed from this community"
                        );
                        refresh();
                        setModalOpen(false);
                      }
                    },
                  },
                  { text: "no" },
                ]
              )
            }
          >
            <Ionicons
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                color: "#E2CFC2",
              }}
              name="trash"
              size={30}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#E2CFC2",
                fontFamily: "quicksand-bold",
                fontSize: 15,
              }}
            >
              REMOVE
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              paddingBottom: "5%",
              paddingTop: "2%",
              justifyContent: "center",
              backgroundColor: "#755f57",
            }}
            onPress={async () => {
              await sendBorrowerNotif();
              Alert.alert(
                "A notification was sent to the borrower asking them to return this book soon. "
              );
            }}
          >
            <Ionicons
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                color: "#E2CFC2",
              }}
              name="ios-send"
              size={30}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#E2CFC2",
                fontFamily: "quicksand-bold",
                fontSize: 15,
              }}
            >
              SEND REMINDER TO BORROWER
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 15,
    borderColor: "#A48578",
    borderWidth: 12,
    marginTop: 20,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
    borderColor: "#947b70",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    borderWidth: 3,
    marginTop: 10,
    borderStyle: "dashed",
    marginTop: 20,
  },
  statusText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#A48578",
    fontFamily: "quicksand-bold",
    color: "#E2CFC2",
  },

  requestedUsersText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    padding: 10,
    color: "#D1D6DC",
    backgroundColor: "#A48578",
    fontFamily: "quicksand-bold",
  },
});
