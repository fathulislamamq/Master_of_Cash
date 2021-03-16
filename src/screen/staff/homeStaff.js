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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeStaff extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
    };
  }

  lihat = () => {
    const url = `https://master-of-sale.herokuapp.com/api/supplier`;

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
        console.log('ini suppliernya', resjson.data);
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
        this.lihat();
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
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.viewLogin}>
          <ScrollView>
            <View style={styles.headerBg}>
              <Image
                source={require('../../assets/icon/sort-button-with-three-lines.png')}
                style={styles.headerIcon}
              />
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>Dashboard</Text>
              </View>
              <Image
                source={require('../../assets/icon/round-account-button-with-user-inside.png')}
                style={styles.headerIconRight}
              />
            </View>

            <View style={styles.category}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('InventoryStaff')}
                style={styles.textContainer}>
                <Image
                  source={require('../../assets/icon/inventory.png')}
                  style={styles.categoryIcon}
                />
                <Text style={styles.categoryText}>Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CategoryStaff')}
                style={styles.textContainer}>
                <Image
                  source={require('../../assets/icon/grid.png')}
                  style={styles.categoryIcon}
                />
                <Text style={styles.categoryText}>Kategori</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PengeluaranStaff')
                }
                style={styles.textContainer}>
                <Image
                  source={require('../../assets/icon/electronics.png')}
                  style={styles.categoryIcon}
                />
                <Text style={styles.categoryText}>Pengeluaran</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PembelianStaff')}
                style={styles.textContainer}>
                <Image
                  source={require('../../assets/icon/shopping-basket.png')}
                  style={styles.categoryIcon}
                />
                <Text style={styles.categoryText}>Pembelian</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.categoryText}>Supplier</Text>
            {this.state.data.map((v, k) => {
              return (
                <View key={k} style={styles.listContainer}>
                  <Text style={styles.listText}>{v.nama}</Text>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '25%'}}>
                      <Text style={{fontWeight: 'bold'}}>telepon</Text>

                      <Text style={{fontWeight: 'bold'}}>alamat</Text>
                    </View>

                    <View style={{width: '75%'}}>
                      <Text> : {v.telepon}</Text>

                      <Text> : {v.alamat}</Text>
                    </View>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity style={styles.listContainer}>

              <Icon name='add' size={30} style={{alignSelf:'center'}} />
              <Text style={{fontWeight:'bold',alignSelf:'center'}}>Tambah Supplier</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity onPress={() => this.keluar()} style={styles.keluar}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Keluar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{position: 'absolute'}}>
          <View style={{height: 50, width: 50, backgroundColor: 'blue'}}>
            <Icon name="add" size={30} />
          </View>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.bottomText}>Rencana</Text>
            <Text style={styles.totalText}>Rencana</Text>
          </View>
          <Text style={styles.chckText}>Rencana</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keluar: {
    margin: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  headerBg: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#158ac5',
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'center',
  },
  headerDash: {
    marginTop: 11,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginTop: 10,
    flex: 1,
  },
  listText: {
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomText: {
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  qtyText: {
    fontSize: 13,
    marginLeft: '10%',
  },
  totalText: {
    fontSize: 13,
    marginLeft: '10%',
  },
  hargaText: {
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '35%',
  },
  chckText: {
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '35%',
  },
  textBarang: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  headerView: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  viewLogin: {
    width: '95%',
    height: '90%',
    marginTop: 5,
    backgroundColor: '#f0f1f5',
    elevation: 10,
    borderRadius: 10,
  },

  categoryContainer: {
    width: '30%',
    height: 50,
    marginLeft: 10,
    borderRadius: 10,
  },
  textContainer: {
    width: '33%',
    height: 90,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
  },
  listContainer: {
    width: '95%',
    backgroundColor: '#bbe1fd',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  bottomContainer: {
    width: '94%',
    height: 50,
    backgroundColor: '#bbe1fd',
    paddingTop: '5%',
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barangContainer: {
    width: '90%',
    height: 120,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
  },
  viewBarang: {
    flexDirection: 'row',
  },
  category: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    paddingLeft: 10,
  },
  viewTopU: {
    // alignItems: 'center',
    // flex: 1,
    // paddingTop: '2.5%',
  },
  headerIcon: {
    width: 35,
    height: 35,
  },
  headerIconRight: {
    width: 35,
    height: 35,
    marginLeft: '40%',
    tintColor: '#3c48ae',
  },
  dashIcon: {
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginRight: '3%',
  },
  categoryIcon: {
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginLeft: '10%',
    paddingBottom: '10%',
  },
  listIcon: {
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginLeft: '10%',
    paddingBottom: '10%',
  },
  barangIcon: {
    tintColor: 'white',
    width: 60,
    height: 60,
    marginLeft: '10%',
    paddingBottom: '10%',
  },
});
