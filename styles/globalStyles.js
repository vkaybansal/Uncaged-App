import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  background: {
    // backgroundColor: '#F3E3D8',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  titleText: {
    fontFamily: "quicksand-bold",
    fontSize: 30,
    color: "#6e4732",
    textAlign: "center",
    marginTop: 20,
  },

  subtitleText: {
    fontFamily: "quicksand-normal",
    fontSize: 20,
    color: "#6e4732",
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },

  paragraph: {
    fontFamily: "quicksand-normal",
    textAlign: "center",
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 20,
    marginHorizontal: 10,
    color: "#492C1D",
  },

  input: {
    borderWidth: 3,
    marginHorizontal: 15,
    padding: 20,
    fontSize: 18,
    alignItems: "center",
    borderColor: "#E2CFC2",
    borderStyle: "solid",
    // filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    borderRadius: 30,
    marginTop: 20,
    fontFamily: "quicksand-bold",
    fontSize: 20,
    color: "#E2CFC2",
  },
  refreshStyle: {
    width: 150,
    height: 45,
    borderRadius: 30,
    borderColor: "#998a82",
    borderStyle: "solid",
    borderWidth: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b8a9a2",
  },
  refreshButtonText: {
    fontSize: 20,
    fontFamily: "quicksand-bold",
    color: "#635b58",
  },
});
