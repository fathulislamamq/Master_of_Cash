import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import CheckBox from '@react-native-community/checkbox';

export default class PembelianStaff extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      token: '',
    };
  }

  barang = () => {
    const url = `https://master-of-sale.herokuapp.com/api/pembelian`;

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
                  <Text style={styles.categoryText}>Pembelian</Text>
                </View>
                <Image
                  source={require('../../assets/icon/round-account-button-with-user-inside.png')}
                  style={styles.headerIconRight}
                />
              </View>
              {this.state.data.map((v, k) => {
                return (
                  <View key={k} style={styles.listContainer}>
                    <TouchableOpacity
                      style={{
                        marginLeft: 10,
                        marginBottom: 15,
                        width: 80,
                        height: 80,
                        borderWidth: 3,

                        alignSelf: 'center',
                      }}
                    />

                    <View>
                      <Text style={styles.barangText}>{v.barang.nama}</Text>

                      <Text style={styles.qtyText}>Qty: {v.jumlah}</Text>

                      <Text style={styles.perusahaanText}>
                        Perusahaan: {v.supplier.nama}
                      </Text>
                    </View>
                    <Text style={styles.listText}>Rp. {v.total_biaya},00</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('BeliStaff')}
            style={styles.rmb}>
              <View style={styles.vpm}>
                <Icon name="add" size={30} />
              </View>

              <Text style={{ fontWeight: 'bold' }}>Add List</Text>
              <Text style={{fontWeight: 'bold'}}>Pembelian</Text>
              
            </TouchableOpacity>
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
