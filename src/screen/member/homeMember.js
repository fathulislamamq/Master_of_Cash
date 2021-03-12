import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

export default class HomeMember extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      saldo: '',
      token: '',
      id: '',
      history: false,
      qr: false,
    };
  }

  lihat = () => {
    const {id, token} = this.state;
    console.log('ini id ', id);
    // console.log(token);
    const url = `https://master-of-sale.herokuapp.com/api/memberpersonally`;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resjson) => {
        console.log('ini member', resjson.user);
        this.setState({data: resjson.user, saldo: resjson.saldo});
      })
      .catch((error) => {
        console.log('errornya adalah: ' + error);
        this.setState({loading: false});
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        AsyncStorage.getItem('id').then((id) => {
          this.setState({token: token});
          this.setState({id: id.toString()});
          this.lihat();
        });
      } else {
        console.log('gak ada token');
      }
    });
  }

  keluar = () => {
    AsyncStorage.clear();
    this.props.navigation.replace('Login');
  };
  render() {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" />

        <ImageBackground
          source={require('../../assets/image/green.png')}
          style={{flex: 1}}>
          {/* modal transaksi */}
          <Modal
            animationType="slide"
            visible={this.state.history}
            onRequestClose={() => this.setState({history: false})}>
            <ImageBackground
              source={require('../../assets/image/green.png')}
              style={{flex: 1, alignItems: 'center'}}>
              <View style={{width: '100%', padding: 10, marginBottom: 5}}>
                <Text style={styles.textJudul}>History Transaksi</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#cccccc',
                }}>
                <TouchableOpacity style={styles.listTombol}>
                  <View style={{width: '90%'}}>
                    <Text style={{marginVertical: 5}}>History Transaksi</Text>
                  </View>

                  <View style={{width: '10%', alignItems: 'center'}}>
                    <Icon name="chevron-right" size={30} />
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <ScrollView>
            <View style={{alignItems: 'center', padding: 10, marginTop: 20}}>
              <Text style={styles.textJudul}>Member</Text>
              <Text style={styles.textJudul}>Master of Cash</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <LinearGradient
                colors={['blue', 'deepskyblue']}
                style={{
                  width: '95%',
                  height: 200,
                  borderRadius: 20,
                  marginBottom: 10,
                  elevation: 5,
                }}>
                <View style={{alignItems: 'center', padding: 10}}>
                  <Text style={styles.textJudul}>{this.state.data.name}</Text>

                  <Text style={styles.isiData}>id: {this.state.data.id}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '35%', padding: 5}}>
                    <Text style={styles.judulData}>Total Belanja</Text>

                    <Text style={styles.judulData}>Saldo</Text>

                    <Text style={styles.judulData}>Email</Text>

                    <Text style={styles.judulData}>No.Telepon</Text>

                    <Text style={styles.judulData}>Alamat</Text>
                  </View>

                  <View style={{width: '5%', padding: 5}}>
                    <Text style={styles.isiData}>:</Text>

                    <Text style={styles.isiData}>:</Text>

                    <Text style={styles.isiData}>:</Text>

                    <Text style={styles.isiData}>:</Text>

                    <Text style={styles.isiData}>:</Text>
                  </View>

                  <View style={{width: '60%', padding: 5}}>
                    <Text style={styles.isiData}>0 X</Text>

                    <Text style={styles.isiData}>
                      Rp. {this.state.saldo.saldo},00;
                    </Text>

                    <Text style={styles.isiData}>{this.state.data.email}</Text>

                    <Text style={styles.isiData}>
                      {this.state.data.telepon}
                    </Text>

                    <Text style={styles.isiData}>{this.state.data.alamat}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#cccccc',
                  paddingTop: 20,
                  paddingHorizontal: 5,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                }}>
                <TouchableOpacity style={styles.listTombol}>
                  <View style={{width: '90%'}}>
                    <Text style={{marginVertical: 5}}>History Transaksi</Text>
                  </View>

                  <View style={{width: '10%', alignItems: 'center'}}>
                    <Icon name="chevron-right" size={30} />
                  </View>
                </TouchableOpacity>

                <View style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Scan Code
                  </Text>

                  <Image
                    style={{width: 150, height: 150}}
                    source={require('../../assets/icon/qr_code.png')}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => this.keluar()}
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'red',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 10,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Keluar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  textJudul: {color: 'white', fontWeight: 'bold', fontSize: 20},
  judulData: {fontWeight: 'bold', color: 'white'},
  isiData: {color: 'white'},
  listTombol: {
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
