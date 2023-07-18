import React from "react";
import { StyleSheet, View } from "react-native";

export default function ItemsCard(props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.cardContent}>{props.children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    borderRadius: 30, // gives card curved edges
    shadowOffset: { width: 1, height: 1 }, //shadow of the component; how much to the right and how much down
    shadowColor: "#333",
    shadowOpacity: 0.3, // how visible it is; 0 --> invisible, 1 --> dark
    shadowRadius: 2, // how it blends in as it goes further away from the card
    marginHorizontal: 5, // distance away from the horizontals
    marginVertical: 6,
    backgroundColor: "#949494",
    width: 337,
    height: 53,
    backgroundColor: "#E1CFC2",
  },
  cardContent: {
    // marginHorizontal: 18,
    // marginVertical: 20
  },
});
