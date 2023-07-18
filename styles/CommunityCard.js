import React from "react";
import { StyleSheet, View } from "react-native";

export default function CommunityCard(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6, // gives card curved edges
    backgroundColor: "#f2f6fa",
    shadowOffset: { width: 1, height: 1 }, //shadow of the component; how much to the right and how much down
    shadowColor: "#333",
    shadowOpacity: 0.3, // how visible it is; 0 --> invisible, 1 --> dark
    shadowRadius: 2, // how it blends in as it goes further away from the card
    marginHorizontal: 30, // distance away from the horizontals
    marginVertical: 10,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
});
