import { API, Auth } from "aws-amplify";
import { createContext, useEffect, useState } from "react";
import { createUsers } from "../src/graphql/mutations";
import { getUsers } from "../src/graphql/queries";
import * as Notifications from "expo-notifications";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  // Question - Why do we need refreshUser?
  const [user, setUser] = useState({
    user: null,
    refreshUser: async () => {
      await retrieveUser();
    },
  });

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    const currUser = await Auth.currentAuthenticatedUser();
    const potentialUser = await getUserFromDatabase(currUser);
    // Question - Why do we need refreshUser?
    setUser({
      user: potentialUser,
      refreshUser: async () => {
        await retrieveUser();
      },
    });
  };

  async function getUserFromDatabase(cognitoUser) {
    console.log("fetching...");
    if (cognitoUser?.attributes?.sub == null) {
      return null;
    }
    const dynamoUser = await API.graphql({
      query: getUsers,
      variables: { uId: cognitoUser.attributes.sub },
    });
    if (dynamoUser == null || dynamoUser.data.getUsers == null) {
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      const pushToken = [pushTokenData];
      await addUser(cognitoUser, pushToken);
      // must return the user using "get user" query as that is what the object looks like
      const matchingNewUser = await API.graphql({
        query: getUsers,
        variables: { uId: cognitoUser.attributes.sub },
      });
      return matchingNewUser;
    }
    return dynamoUser;
  }

  async function addUser(cognitoUser, pushToken) {
    try {
      await API.graphql({
        query: createUsers,
        variables: {
          input: {
            uId: cognitoUser.attributes.sub,
            userName: cognitoUser.username,
            pushToken: pushToken,
          },
        },
      });
    } catch (evt) {
      console.log(evt);
    }
  }
  if (typeof user != "undefined")
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
