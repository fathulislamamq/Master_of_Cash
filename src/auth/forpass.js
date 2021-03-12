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
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Forpass extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      email2: '',
      token: true,
      password: '',
      password_confirmation: '',
      visible: true,
      visible2: true,
      loading: false,
      loading2: '',
      reset: false,
    };
  }

  forPass = () => {
    const {email, password} = this.state;
    const url = 'https://master-of-sale.herokuapp.com/api/password/email';
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log('ini resjsonnya', resjson);
        const {message} = resjson;
        if (message) {
          this.setState({loading: false});
          ToastAndroid.show(
            'Sedang Mengirim Permintaan ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            this.setState({reset: true}),
            Alert.alert(
              'Berhasil Merespons',
              'Token berhasil dikirim ke Email Anda',
              [
                {
                  text: 'ok',
                  style: 'cancel',
                },
              ],
            ),
          );
        } else {
          console.log('ini json ', resjson.data.token);
          this.setState({loading: false});
          Alert.alert(
            'Peringatan',
            'Email yang Anda masukkan tidak terdaftar',
            [
              {
                text: 'ok',
                style: 'cancel',
              },
            ],
          );
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('ini error ', error);
      });
  };

  resPass = () => {
    const {email, token, password, password_confirmation} = this.state;
    const url = 'https://master-of-sale.herokuapp.com/api/password/reset';
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        token: token,
        password: password,
        password_confirmation: password_confirmation,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log('ini resjsonnya', resjson);
        const {message} = resjson;
        if (message) {
          this.setState({loading: false});
            ToastAndroid.show(
                'Password Anda Berhasil di Reset ',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                );
            this.props.navigation.replace('Login');
        } else {
          console.log('ini json ', resjson);
          this.setState({loading: false});
          Alert.alert(
            'Peringatan',
            'ada ketidaksesuaian dalam mengisi data',
            [
              {
                text: 'ok',
                style: 'cancel',
              },
            ],
          );
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('ini error ', error);
      });
  };

  lihat = () => {
    this.setState({visible: !this.state.visible});
  };

  lihat2 = () => {
    this.setState({visible2: !this.state.visible2});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {/* untuk reset password */}
        <Modal
          animationType="slide"
          visible={this.state.reset}
          onRequestClose={() => this.setState({reset: false})}>
          <View style={{flex: 1}}>
            <ImageBackground
              source={require('../assets/image/green.png')}
              style={styles.mainView}>
              <View
                style={{
                  position: 'absolute',
                  top: '15%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  width: 150,
                  height: 150,
                }}>
                <View
                  style={{
                    backgroundColor: 'silver',
                    height: 130,
                    width: 130,
                    borderRadius: 65,
                  }}>
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
                    value={this.state.email2}
                    keyboardType={'email-address'}
                    style={{flex: 1}}
                    placeholder="Email"
                    onChangeText={(input) => this.setState({email2: input})}
                  />
                </View>

                <View style={styles.viewInput2}>
                  <Icon name="code" size={25} style={{marginHorizontal: 9}} />
                  <TextInput
                    value={this.state.token}
                    keyboardType={'email-address'}
                    style={{flex: 1}}
                    placeholder="Token"
                    onChangeText={(input) => this.setState({token: input})}
                  />
                </View>

                <Text style={{color: 'red', fontSize: 10, marginBottom: 10}}>
                  token anda sudah di kirim, silahkan cek email anda, kemudian
                  copy{' '}
                </Text>

                <View style={styles.viewInput}>
                  <Image
                    source={require('../assets/icon/locked-padlock.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    style={{flex: 1}}
                    value={this.state.password}
                    placeholder="New Password"
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

                <View style={styles.viewInput}>
                  <Image
                    source={require('../assets/icon/locked-padlock.png')}
                    style={styles.icon}
                  />
                  <TextInput
                    style={{flex: 1}}
                    value={this.state.password_confirmation}
                    placeholder="Confirm New Password"
                    onChangeText={(input) =>
                      this.setState({password_confirmation: input})
                    }
                    secureTextEntry={this.state.visible2}
                  />
                  <TouchableOpacity>
                    <Icon
                      style={{margin: 5}}
                      name={this.state.visible2 ? 'eye-off' : 'eye'}
                      size={25}
                      color={this.state.visible2 ? 'grey' : '#4c9b8d'}
                      onPress={() => this.lihat2()}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.viewTextLogin}
                  onPress={() => this.resPass()}>
                  {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.replace('BottomTab', {screen: 'Home'})
                }> */}
                  {this.state.loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.textLogin}>Reset Now</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </Modal>
        <ImageBackground
          source={require('../assets/image/green.png')}
          style={styles.mainView}>
          <View
            style={{
              position: 'absolute',
              top: '20%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              width: 150,
              height: 150,
            }}>
            <View
              style={{
                backgroundColor: 'silver',
                height: 130,
                width: 130,
                borderRadius: 65,
              }}>
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

            <TouchableOpacity
              style={styles.viewTextLogin}
              onPress={() => this.forPass()}>
              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.replace('BottomTab', {screen: 'Home'})
                }> */}
              {this.state.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.textLogin}>Send</Text>
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
  viewInput2: {
    flexDirection: 'row',
    height: 50,
    width: 300,
    backgroundColor: '#0000001a',
    borderRadius: 10,
    alignItems: 'center',
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
