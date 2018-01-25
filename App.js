import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
// import BarcodeScanner from './components/BarcodeScanner.js';
import AsyncGet from './utils/async-get';
import axios from 'axios';
// import _ from 'lodash';

const API_KEY = '7110d39470a8b9d598845ceeefad5420';
const API_ID = '94a66a76';
const ROOT_URL = 'https://api.edamam.com';

class App extends Component {
  constructor() {
    super();

    this.state = {
      upc: null,
      searchText: '',
      response: {
        hits: []
      }
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  // _handleBarCodeRead = barCode => {
  //   this.setState({
  //     upc: barCode.data
  //   });
  // };

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

  _handleBarCodeRead = obj => {
    this.setState({
      upc: obj.data
    });

    let q = this.state.searchText;
    let u = this.state.upc;

    const configuration = {
      headers: {
        'X-Mashape-Key': 'SEHxbUG4JNmshq5esXxrSnkcAtjOp1AwYTLjsnoIzz3NSZcpe7',
        Accept: 'application/json'
      }
    };
    axios
      .get(
        'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/upc/' +
          u,
        configuration
      )
      .then(res => {
        this.setState({
          searchText: res.data.title
        });
      });
    AsyncGet(
      `${ROOT_URL}/search?q=${q}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=3`
    ).then(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    console.log(this.state.upc, this.state.searchText);
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Fork n Spoon</Text>
        <View style={styles.barcode}>
          {this.state.hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
          ) : this.state.hasCameraPermission === false ? (
            <Text>Camera permission is not granted</Text>
          ) : null}
          {/* <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{ height: 200, width: 200 }}
          /> */}
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{ height: 200, width: 200 }}
          />
        </View>
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
    color: 'red',
    fontSize: 20
  },
  barcode: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  }
});

export default App;
