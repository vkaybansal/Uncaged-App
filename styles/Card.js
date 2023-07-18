import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getUsers } from "../src/graphql/queries";

export default function Card(props) {
  const [ownerName, setOwnerName] = useState("");
  // console.log(props.authors);

  // authors names are stored as an array -- in order to display all the authors
  // the array is converted into a string and stored into a variable.
  let authorNames = props.authors;
  if (props.authors != null && typeof props.authors != "string") {
    authorNames = "";
    props.authors.map((author) => (authorNames += author + ", "));
  }

  // shortens the length of the title so it fits on the card
  let title = props.title;
  if (title != null && title.length > 45)
    title = title.substring(0, 45) + "...";

  // if the owner needs to be displayed, then the name of the owner is
  // retreived using the UId stored within the book
  async function retrieveOwner() {
    if (props.user != null) {
      const owner = await API.graphql({
        query: getUsers,
        variables: { uId: props.user },
      });
      const name = owner.data.getUsers.userName;
      if (props.owner) setOwnerName("Owner: " + name);
      else setOwnerName("Borrower: " + name);
    }
  }

  // retrieves the owner when initially rendered
  useEffect(() => {
    retrieveOwner();
  });

  // displays the cover (using the uri passed in), title, name of the author,
  // name of owner, and the status of the book (if passed in) of the book
  return (
    <View style={styles.card}>
      <Image
        source={{
          width: 125,
          height: 180,
          uri: props.uri,
        }}
        style={styles.image}
      />
      <View style={{ flex: 1, marginVertical: 20, marginHorizontal: 10 }}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitle}>{authorNames}</Text>
        <Text style={{ ...styles.subtitle, color: "white" }}>
          {props.status}
        </Text>
        {((!props.owner && props.status == "borrowed") || props.owner) && (
          <Text style={{ ...styles.subtitle, color: "white" }}>
            {ownerName}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 10,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#f2f6fa",
    shadowOffset: { width: 1, height: 1 }, //shadow of the component; how much to the right and how much down
    shadowColor: "#333",
    shadowOpacity: 0.3, // how visible it is; 0 --> invisible, 1 --> dark
    shadowRadius: 2, // how it blends in as it goes further away from the card
    marginHorizontal: 10, // distance away from the horizontals
    marginVertical: 10,
    height: 200,
    backgroundColor: "#A48578",
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "quicksand-bold",
    color: "#E2CFC2",
    maxWidth: 225,
  },
  subtitle: {
    marginTop: 7,
    fontSize: 17,
    fontFamily: "quicksand-bold",
    color: "#56494C",
    maxWidth: 225,
  },
});
