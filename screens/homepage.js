import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase'

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
import EventCard from "./eventcard"

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      events: [],
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchEvents();
  }

  fetchEvents = () => {
    firebase
    .database()
    .ref("/events/")
    .on('value', snapshot => {
      let events = [];
      if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              events.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({events : events})
          console.log(this.state.events)
          this.props.setUpdateToFalse();
          
    },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        })
  }

  renderItem = ({ item: event }) => {
    return <EventCard event={event} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appTitleTextContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.iconImage}></Image>
              <Text style={styles.appTitleText}> Calender App</Text>
            </View>
          </View>
          <View style={styles.appGreeting}>
            <Text style={styles.appTextBig}>Hello [user]!</Text>{' '}
            <Text style={styles.appTextSmall}>Today is [day, month].</Text>
          </View>
          <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.events}
                renderItem={this.renderItem}
              />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5,
  },
  appGreeting: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
    flexDirection: 'row',
    margin: -15
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  appTextBig: {
    color: 'white',
    fontSize: RFValue(45),
    fontFamily: 'Bubblegum-Sans',
  },
  appTextSmall: {
    color: 'white',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans',
  },
});
