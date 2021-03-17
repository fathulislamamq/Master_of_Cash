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

export default class InventoryKasir extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
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
                  <Text style={styles.categoryText}>Inventory</Text>
                </View>
                <Image
                  source={require('../../assets/icon/round-account-button-with-user-inside.png')}
                  style={styles.headerIconRight}
                />
              </View>

              <Text style={styles.categoryText}>Daftar Barang</Text>

              {this.state.data.map((v, k) => {
                return (
                  <TouchableOpacity key={k} style={styles.listContainer}>
                    <View style={{width: '70%'}}>
                      <Text style={styles.qtyText}>
                        <Text style={{fontWeight: 'bold'}}>Nama</Text> :{' '}
                        {v.nama}
                      </Text>

                      <Text style={styles.qtyText}>
                        <Text style={{fontWeight: 'bold'}}>Stok</Text> : {v.stok}
                      </Text>
                    </View>

                    <View style={{width: '30%'}}>
                      <Text style={styles.hargaText}>Harga Jual </Text>

                      <Text style={styles.qtyText}> {v.harga_jual}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.bottomText}>Rencana</Text>
              <Text style={styles.totalText}>Rencana</Text>
            </View>
            <Text style={styles.chckText}>Rencana</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBg: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginTop: 5,
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
    marginLeft: '10%',
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
    textAlign: 'right',
    flex: 1,
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
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
    width: '94%',
    backgroundColor: '#bbe1fd',
    paddingVertical: '5%',
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
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
    alignItems: 'center',
    flex: 1,
    paddingTop: '2.5%',
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
