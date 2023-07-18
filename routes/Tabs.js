import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import BooksBorrowed from "../screens/BooksBorrowed";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddBook from "../screens/AddBook";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "Share Book") {
            iconName = focused ? "share" : "share-outline";
          } else if (route.name == "Books Borrowed")
            iconName = focused ? "list-circle" : "list-circle-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#9DAFD2",
        tabBarInactiveTintColor: "#9B928D",
        tabBarStyle: {
          backgroundColor: "#56494C",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Share Book"
        component={AddBook}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Books Borrowed"
        component={BooksBorrowed}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
