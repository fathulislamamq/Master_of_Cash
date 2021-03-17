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
  Modal,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class FixTransaksiKasir extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loadingH: false,
      member: [],
      member_id: 0,
      bayarM: false,
      loadingM: false,
      dibayar: '',
      bayarL: false,
      loadingL: false,
      token: '',
      barang_id: 0,
      jumlah_barang: 1,
      transaksiM: [],
      transaksiL: [],
    };
  }

  member = () => {
    const url = `https://master-of-sale.herokuapp.com/api/member`;

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
        console.log('ini member', resjson.data);
        this.setState({member: resjson.data});
      })
      .catch((error) => {
        console.log('errornya adalah: ' + error);
        this.setState({loading: false});
      });
  };

  keranjang = () => {
    const url = `https://master-of-sale.herokuapp.com/api/detailpenjualan/request`;

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
        console.log('ini keranjang ', resjson.data[0]);
        this.setState({data: resjson.data});
      })
      .catch((error) => {
        console.log('eTransaksiKasirrrornya adalah: ' + error);
        // alert('errornya adalah: ' + error);
        this.setState({loading: false});
      });
  };

  beliM = () => {
    const {member_id} = this.state;

    this.setState({loadingM: true});

    const url = `https://master-of-sale.herokuapp.com/api/detailpenjualan/confirm`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        member_id: member_id,
      }),
    })
      .then((respon) => respon.json())
      .then((resjson) => {
        if (resjson.status === 'success') {
          console.log('id member ', this.state.member_id);
          console.log('ini transaksi member ', resjson.data);
          this.setState({
            transaksiM: resjson.data,
            loadingM: false,
            bayarL: false,
          });
          this.props.navigation.replace('HistoryTransaksiKasir');
          alert(resjson.message);
        } else {
          alert(resjson.message);
        }
      })
      .catch((error) => {
        console.log('errornya adalah: ' + error);
        this.setState({loadingM: false});
      });
  };

  beliL = () => {
    const {dibayar} = this.state;

    this.setState({loadingL: true});

    const url = `https://master-of-sale.herokuapp.com/api/detailpenjualan/confirm`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        dibayar: dibayar,
      }),
    })
      .then((respon) => respon.json())
      .then((resjson) => {
        console.log('ini transaksi lansung ', resjson);
        this.setState({
          transaksiL: resjson.data,
          loadingL: false,
          bayarL: false,
        });
        this.props.navigation.replace('HistoryTransaksiKasir');
        alert('berhasil bayar langsung');
      })
      .catch((error) => {
        console.log('errornya adalah: ' + error);
        this.setState({loadingL: false});
      });
  };

  hapusKeranjang = (id) => {
    console.log('ini idnya ', id);
    this.setState({loadingH: true});

    const url = `https://master-of-sale.herokuapp.com/api/penjualan/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log('ini datanya ', resJson.status);
        if (resJson.status == 'success') {
          ToastAndroid.show(
            'Berhasil Hapus Pesanan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loadingH: false});
          this.props.navigation.replace('TransaksiKasir');
        } else {
          console.log('erere');
          alert('Gagal Menghapus Pesanan');
          this.setState({loadingH: false});
        }
      })
      .catch((resJson) => {
        this.setState({loadingH: false});
        alert('Ada Kesalahan Server');
        console.log('ini errro  ', resJson);
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.keranjang();
        this.member();
      } else {
        console.log('gak ada token');
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* Modal untuk Bayar Member */}

        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.bayarM}
          onRequestClose={() => this.setState({bayarM: false})}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={{backgroundColor: 'grey'}}>
              <View style={{backgroundColor: 'white', margin: 5}}>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.member_id}
                  onValueChange={(id) => this.setState({member_id: id})}>
                  {this.state.member.map((v, i) => (
                    <Picker.Item key={i} label={v.name} value={v.id} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity onPress={() => this.beliM()} style={styles.ok}>
                {this.state.loadingM ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Bayar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal untuk Bayar Langsung */}

        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.bayarL}
          onRequestClose={() => this.setState({bayarL: false})}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={{backgroundColor: 'grey'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                  height: 50,
                  borderWidth: 0.5,
                  margin: 10,
                  backgroundColor: 'white',
                }}>
                <Text style={{width: '10%'}}>Rp. </Text>
                <TextInput
                  keyboardType="number-pad"
                  value={this.state.dibayar}
                  onChangeText={(t) => this.setState({dibayar: t})}
                  style={{width: '90%'}}
                />
              </View>

              <TouchableOpacity onPress={() => this.beliL()} style={styles.ok}>
                {this.state.loadingL ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    Bayar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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

              {this.state.data.map((v, k) => {
                return (
                  <View style={styles.listContainer} key={k}>
                    <Text>
                      <Text style={{fontWeight: 'bold'}}>id</Text> : {v.id}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>Nama</Text> : {v.nama}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>Jumlah </Text> :{' '}
                      {v.jumlah_barang}
                    </Text>

                    <Text>
                      <Text style={{fontWeight: 'bold'}}>Total Harga</Text> :{' '}
                      {v.total_harga}
                    </Text>

                    <TouchableOpacity
                      onPress={() => this.hapusKeranjang(v.id)}
                      style={styles.del}>
                      {this.state.loadingH ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                          Hapus Pesanan
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              onPress={() => this.setState({bayarM: true})}
              style={styles.ok}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Member</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({bayarL: true})}
              style={styles.ok}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                Bayar Langsung
              </Text>
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

  del: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    margin: 10,
    borderRadius: 10,
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
    height: '100%',
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
    backgroundColor: '#bbe1fd',
    paddingTop: '5%',
    paddingHorizontal: 10,
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 10,
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
