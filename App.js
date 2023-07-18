import "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Amplify } from "aws-amplify";
import awsConfig from "./src/aws-exports";
import {
  Authenticator,
  SignIn,
  SignUp,
  SignedOutMessage,
  ConfirmSignUp,
  Loading,
  ForgotPassword,
  VerifyContact,
  AmplifyTheme,
} from "aws-amplify-react-native";
import HomeStack from "./routes/HomeStack";
import * as Notifications from "expo-notifications";
import { Alert, Image, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import UserContextProvider from "./globalData/UserContext";
import CommunityContextProvider from "./globalData/ComunityContext";
import ComNavContextProvider from "./globalData/ComNavContext";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

// Amplify.configure(awsConfig);
// how does this work (what is analytics)
// Analytics MUST be disabled in order for the configuration to work
Amplify.configure({
  ...awsConfig,
  Analytics: {
    disabled: true,
  },
});
SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    "quicksand-bold": require("./assets/Quicksand-SemiBold.ttf"),
    "quicksand-normal": require("./assets/Quicksand-Regular.ttf"),
    fasthand: require("./assets/Fasthand-Regular.ttf"),
  });
  useCallback(() => {
    async () => {
      await SplashScreen.preventAutoHideAsync();
    };
  }, []);

  useEffect(() => {
    async function setUpPushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus != "granted") {
        Alert.alert(
          "Permission required",
          "notifications need appropriate permissions"
        );
        return;
      }
    }
    setUpPushNotifications();
  });
  const [authState, setAuthState] = useState("");

  useEffect(() => {
    const initFunction = async () => {
      await SplashScreen.hideAsync();
    };
    initFunction();
  }, []);

  if (authState === "signedIn")
    return (
      // Calling Home Stack. The UserContextProvider is a global store to use User and Community Data across components
      <UserContextProvider>
        <CommunityContextProvider>
          <ComNavContextProvider>
            <HomeStack />
          </ComNavContextProvider>
        </CommunityContextProvider>
      </UserContextProvider>
    );

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  let topImage = (
    <Image source={require("./assets/logo.png")} style={styles.imageStyle} />
  );
  if (authState === "signUp") {
    topImage = (
      <Image
        source={require("./assets/banner.png")}
        style={{ marginTop: 10, marginLeft: 20 }}
      />
    );
  }
  return (
    <ScrollView style={{ backgroundColor: "#A48578" }}>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          backgroundColor: "#A48578",
          alignItems: "center",
          paddingBottom: 200,
        }}
      >
        {topImage}
        <Authenticator
          hideDefault={true}
          onStateChange={(authStateChange) => {
            setAuthState(authStateChange);
          }}
          theme={customTheme}
        >
          <SignIn />
          <SignUp signUpConfig={signUpConfig} />
          <SignedOutMessage />
          <ConfirmSignUp />
          <Loading />
          <ForgotPassword />
          <VerifyContact />
        </Authenticator>
      </View>
    </ScrollView>
  );
}

const customTheme = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
    backgroundColor: "#A48578",
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#56494C",
    borderRadius: 50,
  },
  sectionHeaderText: {
    color: "#56494C",
    fontSize: 40,
    fontFamily: "fasthand",
    textAlign: "center",
  },
  buttonText: {
    fontFamily: "quicksand-bold",
    color: "#E2CFC2",
  },
  input: {
    padding: 20,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "#E2CFC2",
    color: "#D1D6DC",
    fontFamily: "quicksand-bold",
    fontSize: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontFamily: "quicksand-bold",
    color: "#56494C",
    fontSize: 15,
  },
  sectionFooterLink: {
    fontSize: 15,
    color: "white",
    fontFamily: "quicksand-bold",
    alignItems: "baseline",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#E2CFC2",
    marginHorizontal: 10,
    padding: 5,
  },

  sectionFooter: {
    ...AmplifyTheme.sectionFooter,
    marginBottom: 30,
  },

  signedOutMessage: {
    color: "#A48578",
  },
  navButton: {
    marginLeft: 12,
    borderRadius: 4,
    color: "pink",
  },
  sectionFooterLinkDisabled: {
    fontSize: 15,
    color: "#b5ada8",
    fontFamily: "quicksand-bold",
    alignItems: "baseline",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#b5ada8",
    marginHorizontal: 10,
    padding: 5,
  },

  buttonDisabled: {
    backgroundColor: "#9B928D",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
  },
  phoneInput: {
    ...AmplifyTheme.phoneInput,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#E2CFC2",
  },
  errorRowText: {
    marginLeft: 15,
    fontFamily: "quicksand-bold",
    color: "#e8c4b5",
    fontSize: 17,
  },
};

const signUpConfig = {
  header: "Uncaged Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "username",
      key: "username",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 3,
      type: "password",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "string",
    },
  ],
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
});

export default App;
