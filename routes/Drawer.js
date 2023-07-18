import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { API, Auth } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import BooksContextProvider from "../globalData/BooksContext";
import { CommunityContext } from "../globalData/ComunityContext";
import UserContextProvider from "../globalData/UserContext";
import MyBooks from "../screens/MyBooks";
import MyInfo from "../screens/MyInfo";
import Tabs from "./Tabs";

const Drawer = createDrawerNavigator();

//export default function DrawerNav({ route, navigation }) {
export default function DrawerNav() {
  const communityInfo = useContext(CommunityContext);

  // async function retrieveCommunity() {
  //   //below code is not needed to get users - it is in usercontext?
  //   const cognitoUser = await Auth.currentAuthenticatedUser();
  //   const currUser = await API.graphql({
  //     query: getUsers,
  //     variables: { uId: cognitoUser.attributes.sub },
  //   });

  //   const com = currUser.data.getUsers.currComId;
  //   console.log(com);
  //   const community = await API.graphql({
  //     query: getCommunity,
  //     variables: { cId: com },
  //   });
  //   setCommunity(community.data.getCommunity.cName);
  // }
  // useEffect(() => {
  //   retrieveCommunity();
  // });

  return (
    <BooksContextProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerActiveBackgroundColor: "#E2CFC2",
            drawerActiveTintColor: "#56494C",
            drawerStyle: {
              backgroundColor: "#A48578",
            },
            headerStyle: {
              backgroundColor: "#56494C",
              height: 130,
            },
            headerTintColor: "#E2CFC2",
            headerTitleStyle: {
              fontFamily: "fasthand",
              fontSize: 35,
            },
            headerRight: () => (
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
              />
            ),
          }}
        >
          <Drawer.Screen
            name="Main"
            component={Tabs}
            options={{
              title: communityInfo.currCom.cName,
              drawerLabel: "Home",
            }}
          />
          <Drawer.Screen name="My Books" component={MyBooks} />
          <Drawer.Screen
            name={communityInfo.currCom.cName + " Info"}
            component={MyInfo}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </BooksContextProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: -15,
    marginRight: 10,
    width: 75,
    height: 75,
  },
});
