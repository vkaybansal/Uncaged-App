import { API, Auth } from "aws-amplify";
import { Formik } from "formik";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { createBooks } from "../src/graphql/mutations";
import { globalStyles } from "../styles/globalStyles";
import * as yup from "yup";
import TakePicture from "./TakePicture";
import { useState } from "react";
import SearchBook from "./SearchBook";

const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp"];

function isValidFileType(image) {
  const extension = image.split(".").pop();
  console.log('extension: "' + extension + '"');
  console.log(validFileExtensions);
  validFileExtensions.map((value) => {
    if (value === extension) {
      console.log("validdd!!!");
      return true;
    }
  });
  console.log("in here!");
  return false;
}

const BookSchema = yup.object({
  title: yup.string().required().min(2),
  author: yup.string().required().min(2),
  synopsis: yup.string().required().min(4),
  // image: yup.
  //     string().
  //     required("required")
  // test("is-valid-type", "Not a valid image type",
  // value => { console.log(isValidFileType(value.toLowerCase()))})
});

export default function AddBook() {
  const [picture, setPicture] = useState(
    <Image
      source={require("../assets/default.png")}
      style={{ width: 175, height: 250 }}
    />
  );
  // whenever you need to access some third party process (ex: access database, api, etc.), you need to make
  // a PROMISE -> tells the program that it needs to wait for the process to complete (since front end compiles immediately
  // but the backend/other processes require some more time). This is done by defining the function that calls
  // the api as ASYNC along with the caller of the function. This tells React that the function is making a
  // promise. Then within the function, use the keyword 'await' for the process itself.
  async function addBookDataHandler(enteredBookData, mutation) {
    const user = await Auth.currentUserInfo();
    try {
      await API.graphql({
        query: mutation,
        variables: {
          input: {
            bookId: Math.random().toString(), // figure out better way to do this -> may cause repeat keys
            title: enteredBookData.title,
            description: enteredBookData.synopsis,
            Author: enteredBookData.author,
            Image: enteredBookData.image,
            Genre: enteredBookData.genre,
            status: "available",
            usersOwnBooksUId: user.attributes.sub,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }

  let pictureTaken = "";

  function setImageTaken(image) {
    pictureTaken = image;
  }

  return (
    <View style={{ ...globalStyles.container, backgroundColor: "#E2CFC2" }}>
      <Formik
        initialValues={{ title: "", author: "", synopsis: "", image: "" }}
        validationSchema={BookSchema}
        // must define function as async as it calls another async function
        onSubmit={async (values, actions) => {
          if (pictureTaken != "" && values.image != pictureTaken)
            values.image = pictureTaken;

          await addBookDataHandler(values, createBooks);
          actions.resetForm();
        }}
      >
        {(props) => (
          <ScrollView>
            <View style={{ flexDirection: "row" }}>
              {picture}
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{ ...styles.input }}
                  placeholder="Book Title"
                  onChangeText={props.handleChange("title")}
                  value={props.values.title}
                  onBlur={props.handleBlur("title")}
                />
                <Text>{props.touched.title && props.errors.title}</Text>

                <TextInput
                  style={{ ...styles.input }}
                  placeholder="Author Name"
                  onChangeText={props.handleChange("author")}
                  value={props.values.author}
                  onBlur={props.handleBlur("author")}
                />
                <Text>{props.touched.author && props.errors.author}</Text>
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Synposis"
              multiline
              onChangeText={props.handleChange("synopsis")}
              value={props.values.synopsis}
              onBlur={props.handleBlur("synopsis")}
            />
            <Text>{props.touched.synopsis && props.errors.synopsis}</Text>

            <TextInput
              style={styles.input}
              placeholder="Insert a link of your Image"
              onChangeText={props.handleChange("image")}
              value={props.values.image}
              onBlur={props.handleBlur("image")}
            />
            <Text>{props.touched.image && props.errors.image}</Text>

            {/* <TakePicture handleChange = {props.handleChange} setValue = {(value) => {value = props.values.image}}/> */}
            {/* <TakePicture setImage={setImageTaken} /> */}

            <Button
              title="submit"
              color="orange"
              onPress={props.handleSubmit}
            />
            <SearchBook />
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    ...globalStyles.input,
    borderColor: "#A48578",
    color: "#56494C",
    fontSize: 15,
    padding: 15,
  },
});
