import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, ImageBackground, StyleSheet,StatusBar} from 'react-native';

export default class Splash extends Component {

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        AsyncStorage.getItem('role').then((role) => {
          setTimeout(() => {
            this.props.navigation.navigate(role.toString())
          }, 4000);
        })
      } else {
        setTimeout(() => {
          this.props.navigation.replace('Login');
        }, 4000); 
      }
    })
  }
  

  render() {
    return (
      <>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/image/white.jpg')}
          style={styles.viewMain}></ImageBackground>
        </View>
        </>
    );
  }
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
