import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
// import CheckBox from '@react-native-community/checkbox';

export default class TransaksiKasir extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      token: '',
      barang_id: 0,
      jumlah_barang: 1,
      transaksi: [],
    };
  }

  barang = () => {
    const url = `https://master-of-sale.herokuapp.com/api/barang`;

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
        console.log('ini barang ', resjson.data);
        this.setState({data: resjson.data});
      })
      .catch((error) => {
        console.log('eTransaksiKasirrrornya adalah: ' + error);
        alert('errornya adalah: ' + error);
        this.setState({loading: false});
      });
  };

  beli = () => {
    const {barang_id, jumlah_barang} = this.state;

    this.setState({loading: true});

    const url = `https://master-of-sale.herokuapp.com/api/penjualan`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        barang_id: barang_id,
        jumlah_barang: jumlah_barang,
      }),
    })
      .then((respon) => respon.json())
      .then((resjson) => {
        console.log('ini belanjanya ', resjson.data);
        this.setState({transaksi: resjson.data, loading: false});
        this.props.navigation.navigate('FixTransaksiKasir');
      })
      .catch((error) => {
        console.log('errornya adalah: ' + error);
        this.setState({loading: false});
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.barang();
      } else {
        console.log('gak ada token');
      }
    });
  }

  kurang = () => {
    this.setState({jumlah_barang: this.state.jumlah_barang - 1});
  };

  tambah = () => {
    this.setState({jumlah_barang: this.state.jumlah_barang + 1});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewTopU}>
          <View style={styles.viewLogin}>
            <ScrollView>
              <View style={styles.headerBg}>
                <Image
                  source={require('../../assets/icon/sort-button-with-three-lines.png')}
                  style={styles.headerIcon}
                />
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>Transaksi</Text>
                </View>
                <Image
                  source={require('../../assets/icon/round-account-button-with-user-inside.png')}
                  style={styles.headerIconRight}
                />
              </View>

              <Text style={styles.categoryText}>Barang</Text>

              <Picker
                mode="dropdown"
                selectedValue={this.state.barang_id}
                onValueChange={(id) => this.setState({barang_id: id})}>
                {this.state.data.map((v, i) => (
                  <Picker.Item key={i} label={v.nama} value={v.id} />
                ))}
              </Picker>

              <Text style={styles.categoryText}>Jumlah </Text>

              <View style={{flexDirection: 'row', margin: 10}}>
                <TextInput
                  value={this.state.jumlah_barang.toString()}
                  style={styles.hasJum}
                  onChangeText={(t) => this.setState({jumlah_barang: t})}
                />

                <TouchableOpacity
                  onPress={() => this.kurang()}
                  style={styles.jumlah}>
                  <Icon name="remove" size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.tambah()}
                  style={styles.jumlah}>
                  <Icon name="add" size={20} />
                </TouchableOpacity>
              </View>
            </ScrollView>

            <TouchableOpacity
             onPress={() => this.props.navigation.navigate('FixTransaksiKasir')}
              style={styles.ok}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                Keranjang
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.beli()} style={styles.ok}>
              {this.state.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  Masukkan Keranjang
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rmb: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignItems: 'center',
  },

  ok: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#158ac5',
    margin: 10,
    borderRadius: 10,
  },
  jumlah: {
    width: '15%',
    borderWidth: 0.5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hasJum: {
    width: '70%',
    borderWidth: 0.5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vpm: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bbe1fd',
    elevation: 5,
    marginBottom: 5,
  },
  headerBg: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    backgroundColor: '#158ac5',
    flexDirection: 'row',
    alignItems: 'center',
    // height: 60,
    resizeMode: 'center',
  },
  headerDash: {
    marginTop: 11,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // height: 60,
    resizeMode: 'center',
  },
  headerText: {
    // color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    // marginHorizontal: 20,
    // marginVertical: 15,
    flex: 1,
  },
  categoryText: {
    // color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginTop: 10,
    // marginHorizontal: 20,
    // marginVertical: 15,
    flex: 1,
  },
  listText: {
    marginTop: -9,
    marginRight: 10,
    textAlign: 'right',
    position: 'absolute',
    right: 5,
    bottom: 5,
    // color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    // marginLeft: '10%',
    // marginTop: 10,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  barangText: {
    marginTop: -9,
    // color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
    // marginTop: 10,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  bottomText: {
    marginTop: -9,
    // color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
    // marginTop: 10,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  qtyText: {
    // color: 'white',
    fontSize: 13,
    // fontWeight: 'bold',
    marginLeft: '10%',
    // marginBottom: 15,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  perusahaanText: {
    width: 100,
    // color: 'white',
    fontSize: 13,
    // fontWeight: 'bold',
    marginLeft: '10%',
    // marginBottom: 15,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  totalText: {
    // color: 'white',
    fontSize: 13,
    // fontWeight: 'bold',
    marginLeft: '10%',
    // marginBottom: 15,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  hargaText: {
    marginTop: -9,
    // color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '20%',
    // alignItems: 'center',
    // alignContent: 'center',
    // alignSelf: 'stretch',
    // marginTop: 10,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  chckText: {
    marginTop: -9,
    // color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '35%',
    // alignItems: 'center',
    // alignContent: 'center',
    // alignSelf: 'stretch',
    // marginTop: 10,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  textBarang: {
    // color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
    // marginTop: 10,
    // marginHorizontal: 20,
    // marginVertical: 15,
    // flex: 1,
  },
  headerView: {
    // color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  viewLogin: {
    width: '95%',
    height: '90%',
    backgroundColor: '#f0f1f5',
    elevation: 10,
    borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: '20%',
    // flex: 1,
  },
  categoryContainer: {
    width: '30%',
    height: 50,
    // backgroundColor: '#cccccc',
    // paddingTop: '5%',
    marginLeft: 10,
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingLeft: 10,
    // paddingBottom: 10,
  },
  textContainer: {
    width: '30%',
    height: 90,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingLeft: 10,
    // paddingBottom: 10,
  },
  listContainer: {
    width: '94%',
    height: 100,
    backgroundColor: '#bbe1fd',
    paddingTop: '5%',
    // margin: 10,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingLeft: 10,
    // paddingBottom: 10,
  },
  bottomContainer: {
    width: '94%',
    height: 50,
    backgroundColor: '#bbe1fd',
    paddingTop: '5%',
    // margin: 10,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingLeft: 10,
    // paddingBottom: 10,
  },
  barangContainer: {
    width: '90%',
    height: 120,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingLeft: 10,
    // paddingBottom: 10,
  },
  viewBarang: {
    flexDirection: 'row',
  },
  category: {
    // alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    flexDirection: 'row',
    // paddingHorizontal: 15,
    flexWrap: 'wrap',
    // paddingLeft: 20,
  },
  text: {
    paddingLeft: 10,
    // paddingBottom: 10,
  },
  viewTopU: {
    // justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingTop: '2.5%',
    // width: '100%',
    // height: '100%',
  },
  // viewTopD: {
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   flex: 1,
  //   paddingTop: '2.5%',
  //   // width: '100%',
  //   // height: '100%',
  // },
  headerIcon: {
    // width: 25,
    // height: 25,
    // // tintColor: 'white',
    width: 35,
    height: 35,
    // marginRight: '40%',
    // tintColor: '#3c48ae',
  },
  headerIconRight: {
    // width: 25,
    // height: 25,
    // // tintColor: 'white',
    width: 35,
    height: 35,
    marginLeft: '40%',
    tintColor: '#3c48ae',
  },
  dashIcon: {
    // width: 25,
    // height: 25,
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginRight: '3%',
    // tintColor: 'white',
  },
  categoryIcon: {
    // width: 25,
    // height: 25,
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginLeft: '10%',
    paddingBottom: '10%',
    // tintColor: 'white',
  },
  listIcon: {
    // width: 25,
    // height: 25,
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginLeft: '10%',
    paddingBottom: '10%',
    // tintColor: 'white',
  },
  barangIcon: {
    // backgroundColor: 'blue',
    tintColor: 'white',
    width: 60,
    height: 60,
    marginLeft: '10%',
    paddingBottom: '10%',
    // tintColor: 'white',
  },
  // headerIcon1: {
  //   width: 25,
  //   height: 25,
  //   tintColor: 'white',
  // },
});
