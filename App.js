import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import BarcodeScanner from './components/BarcodeScanner.js';
import AsyncGet from './utils/async-get';

const API_KEY = '7110d39470a8b9d598845ceeefad5420';
const API_ID = '94a66a76';
const ROOT_URL = 'https://api.edamam.com';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchText: '',
      response: {
        hits: []
      }
    };
  }

  makeCall = () => {
    AsyncGet(
      `${ROOT_URL}/search?q=beans&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=30`
    ).then(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  };

  // Logo = ({ title }) => <Text style={styles.heading}>{title}</Text>;

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Fork n Spoon</Text>
        <BarcodeScanner />
        <Button onPress={this.makeCall} title="Press" color="#841584" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    // flex: 1,
    textAlign: 'center',
    color: 'red'
  }
});

export default App;
