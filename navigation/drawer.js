import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTab from "./bottomTab";
import Logout from "../screens/logout";

const Draw = createDrawerNavigator();

export default class Drawer extends Component {
  render() {
    return (
      <Draw.Navigator>
        <Draw.Screen name="BottomTab" component={BottomTab} />
        <Draw.Screen name="Logout" component={Logout} />
      </Draw.Navigator>
    );
  }
}
