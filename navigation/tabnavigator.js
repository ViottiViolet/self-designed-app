import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

import HomePage from '../screens/homepage'
import TodaysEvents from '../screens/todaysevents'
import CreateEvent from '../screens/createevent'
const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdated: false
    };
  }

  renderHome = props => {
      return <HomePage setUpdateToFalse={this.removeUpdated} {...props} />;
    };

  renderToday = props => {
      return <TodaysEvents setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  renderCreate = props => {
    return <CreateEvent setUpdateToTrue={this.changeUpdated} {...props} />;
  };


  changeUpdated = () => {
      this.setState({ isUpdated: true });
    };

  removeUpdated = () => {
      this.setState({ isUpdated: false });
    };

  render() {
    return (
        <Tab.Navigator
            labeled={false}
            barStyle={styles.bottomTabStyle}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                        
                    } else if (route.name === "Today") {
                        iconName = focused ? "sun" : "sun-outline";
                    }
                    else if (route.name === "Create") {
                        iconName = focused ? "add-circle" : "add-circle-outline";
                    }
                    return (
                        <Ionicons
                            name={iconName}
                            size={RFValue(25)}
                            color={color}
                            style={styles.icons}
                        />
                    );
                }
            })}
            activeColor={"#ee8249"}
            inactiveColor={"gray"}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Today" component={TodaysEvents} />
            <Tab.Screen name="Create" component={CreateEvent} />
        </Tab.Navigator>
    );
}
}

const styles = StyleSheet.create({
    bottomTabStyle: {
        backgroundColor: "#2f345d",
        height: "8%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        position: "absolute"
    },
    icons: {
        width: RFValue(30),
        height: RFValue(30)
    }
});