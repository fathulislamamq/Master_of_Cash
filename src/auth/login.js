import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      visible: true,
      check: true,
      loading: false,
      lupa: false,
    };
  }

  signIn = () => {
    const {email, password} = this.state;
    const url = 'https://master-of-sale.herokuapp.com/api/login';
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log('ini resjsonnya', resjson.data);
        const {token} = resjson.data;
        if (token) {
          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem('id', resjson.data.user.id.toString());
          AsyncStorage.setItem('role', resjson.data.user.roles[0].name);
          this.setState({loading: false});
          ToastAndroid.show(
            'Anda Berasil Sign In',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            this.props.navigation.replace(
              resjson.data.user.roles[0].name.toString(),
            ),
          );
        } else {
          console.log('ini json ', resjson.data);
          this.setState({loading: false});
          alert('email dan password Anda salah');
        }
      })
      .catch((error) => {
        console.log('ini error ', error);
      });
  };

  lihat = () => {
    this.setState({visible: !this.state.visible});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/image/green.png')}
          style={styles.mainView}>
          <View
            style={{
              position: 'absolute',
              top: '20%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems:'center',
              borderRadius: 100,
              width: 150,
              height: 150,
            }}>
            <View style={{backgroundColor:'silver',height:130,width:130,borderRadius: 65}}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  // backgroundColor: 'red',
                  borderRadius: 50,
                }}
                source={require('../assets/icon/calculator.png')}
              />

              <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                Master of Cash
              </Text>
            </View>
          </View>
          <View style={styles.viewLogin}>
            {/* <Text style={styles.text}> Login </Text> */}
            <View style={styles.viewInput}>
              <Image
                source={require('../assets/icon/black-envelope-email-symbol.png')}
                style={styles.icon}
              />
              <TextInput
                value={this.state.email}
                keyboardType={'email-address'}
                style={{flex: 1}}
                placeholder="Email"
                onChangeText={(input) => this.setState({email: input})}
              />
            </View>
            <View style={styles.viewInput}>
              <Image
                source={require('../assets/icon/locked-padlock.png')}
                style={styles.icon}
              />
              <TextInput
                style={{flex: 1}}
                value={this.state.password}
                placeholder="Password"
                onChangeText={(input) => this.setState({password: input})}
                secureTextEntry={this.state.visible}
              />
              <TouchableOpacity>
                <Icon
                  style={{margin: 5}}
                  name={this.state.visible ? 'eye-off' : 'eye'}
                  size={25}
                  color={this.state.visible ? 'grey' : '#4c9b8d'}
                  onPress={() => this.lihat()}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textRegister}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => this.setState({check: !this.state.check})}>
                <Icon
                  name={this.state.check ? 'checkbox-outline' : 'checkbox'}
                  size={20}
                  color={this.state.check ? 'grey' : '#4c9b8d'}
                />
                <Text
                  style={this.state.check ? styles.subText : styles.subText2}>
                  Remember Me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => this.props.navigation.navigate('Forpass')}>
                <Text style={styles.subText}>Forget Password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.viewTextLogin}
              onPress={() => this.signIn()}>
              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.replace('BottomTab', {screen: 'Home'})
                }> */}
              {this.state.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.textLogin}>Sign in</Text>
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    // justifyContent: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  viewLogin: {
    width: '95%',
    backgroundColor: '#ffffff',
    elevation: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#4EC5F1',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  viewInput: {
    flexDirection: 'row',
    height: 50,
    width: 300,
    backgroundColor: '#0000001a',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
    // borderRightColor: '#000000',
    // borderRightWidth: 1,
  },
  textRegister: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subText: {
    fontWeight: 'bold',
    color: '#8f8f8f',
  },
  subText2: {
    fontWeight: 'bold',
    color: 'black',
  },
  viewTextLogin: {
    width: 170,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c9b8d',
    marginTop: 10,
    borderRadius: 10,
  },
  textLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
