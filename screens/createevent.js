import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from "firebase";

import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
export default class TodaysEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      events: [],
      eventType: "party",
      dropdownHeight: 70,
      setTitle:"",
      title:"",
      setStart:"",
      start:"",
      setEnd:"",
      end:"",
      setSummary:"",
      summary:""
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addEvent() {
    if (
      this.state.title &&
      this.state.start &&
      this.state.end &&
      this.state.summary
    ) {
      let eventData = {
        title : this.state.title,
        start : this.state.start,
        end : this.state.end,
        summary : this.state.summary,
        event_type : this.state.eventType
      };
      await firebase
        .database()
        .ref(
          "/events/" +
            Math.random()
              .toString(36)
              .slice(2)
        )
        .set(eventData)
        .then(function(snapshot) {});
    }
    else {
      Alert.alert(
        "Error",
        "All fields are required!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      console.log()
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View>
              <Text style={styles.appTitleText}>Create Events</Text>
            </View>
          </View>

          <View style={{ height: RFValue(this.state.dropdownHeight) }}>
            <DropDownPicker
              items={[
                { label: 'Party', value: 'party' },
                { label: 'Meeting', value: 'meeting' },
                { label: 'Work Due', value: 'work due' },
                { label: 'Birthday', value: 'birthday' },
                { label: 'Holiday', value: 'holiday' },
              ]}
              defaultValue={this.state.eventType}
              containerStyle={{
                height: 20,
                borderRadius: 20,
                marginBottom: 10,
                borderColor: 'blue',
                marginTop: 30,
              }}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={{ backgroundColor: 'blue' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: '#2f345d' }}
              labelStyle={{
                color: 'yellow',
                fontFamily: 'Bubblegum-Sans',
              }}
              arrowStyle={{
                color: 'white',
                fontFamily: 'Bubblegum-Sans',
              }}
              onChangeItem={(item) =>
                this.setState({
                  previewImage: item.value,
                })
              }
            />
          </View>

          <View>
            <TextInput
              onChangeText={title => this.setState({ title })}
              style={styles.inputFont}
              placeholder={'Title'}
              placeholderTextColor="white"
            />
          </View>
          <View>
            <TextInput
              onChangeText={start => this.setState({ start })}
              style={styles.inputFont}
              placeholder={'Start'}
              placeholderTextColor="white"
            />
            <TextInput
              onChangeText={end => this.setState({ end })}
              style={styles.inputFont}
              placeholder={'End'}
              placeholderTextColor="white"
            />
          </View>

          <View>
            <TextInput
              onChangeText={summary => this.setState({ summary })}
              style={styles.inputFont}
              placeholder={'Summary'}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.addEvent()}>
              <Text style={{fontSize:20}}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    marginTop: 5,
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    marginTop: RFValue(30),
    marginLeft: RFValue(10),
    Top: RFValue(30),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  submit: {
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 100,
    height: 50,
    backgroundColor: 'purple',
    borderRadius: 20,
    textAlign:"center",
    justifyContent:"center"
  },
});
