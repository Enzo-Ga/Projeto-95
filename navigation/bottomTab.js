import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "../screens/feed";
import CreateCuriosity from "../screens/createCuriosity";

const Tab = createMaterialBottomTabNavigator();

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdated: false,
    };
  }
  renderFeed = (props) => {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderCuriosity = (props) => {
    return <CreateCuriosity setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={this.renderFeed}
          options={{ unMountOnBlur: true }}
        />
        <Tab.Screen
          name="CuriosityScreen"
          component={this.renderCuriosity}
          options={{ unMountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}
