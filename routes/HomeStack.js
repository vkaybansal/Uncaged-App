import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Communities from "../screens/Communities";
import DrawerNav from "./Drawer";

const screens = {
  Communities: {
    screen: Communities,
  },
  Drawer: {
    screen: DrawerNav,
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
  },
});

export default createAppContainer(HomeStack);
