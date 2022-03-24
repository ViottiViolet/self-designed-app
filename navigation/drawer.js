import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./tabnavigator";
import Profile from "../screens/profile";
import Login from "../screens/login"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;