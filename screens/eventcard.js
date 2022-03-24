import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      event_id: this.props.event.key,
      event_data: this.props.event.value
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    let event = this.state.event_data;
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              styles.cardContainer
            }
          >
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={
                    styles.storyTitleText
                  }
                >
                  {event.title}
                </Text>
                <Text
                  style={
                    styles.storyAuthorText
                  }
                >
                  {event.start} to {event.end}
                </Text>
                <Text
                  style={
                    styles.descriptionText
                  }
                >
                  {event.summary}
                </Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(30),
    color: "white"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
});