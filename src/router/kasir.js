import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class KategoryBarangKasir extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      data2: [],
      token: '',
      total: 0,
    };
  }

  kategori = () => {
    const url = `https://master-of-sale.herokuapp.com/api/kategori`;

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
        console.log('ini kategori ', resjson.data);
        this.setState({data: resjson.data});
      })
      .catch((error) => {
        console.log('errornya adalah: ' + error);
        this.setState({loading: false});
      });
  };

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
        console.log('ini kategori ', resjson.data);
        this.setState({data2: resjson.data});
      })
      .catch((error) => {
        console.log('errornya adalah: ' + error);
        this.setState({loading: false});
      });
  };

  tambah = (id) => {
    const id2= this.state.data.id
    if (id === id) {
      this.setState({total: this.state.total + 1});
    }
  };
  kurang = () => {
    // {
    //   this.state.data2.map((v, k) => {
    //     return (

    //   )
    // })}
    this.setState({total: this.state.total - 1});
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.kategori();
        this.barang();
      } else {
        console.log('gak ada token');
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Kategori Barang
          </Text>
        </View>

        {/* <View>
          <ScrollView horizontal={true}>
            {this.state.data.map((v, k) => {
              return (
                <TouchableOpacity style={styles.kategori} key={k}>
                  <Text style={{fontWeight: 'bold'}}>{v.nama}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View> */}

        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.category}>
              {this.state.data2.map((v, k) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.tambah(v.id)}
                    style={styles.barang}
                    key={v.id}>
                    <View style={styles.pajangan} />

                    <View>
                      <Text style={{margin: 5}}>{v.nama}</Text>
                    </View>

                    <Button
                      title="-"
                      color="grey"
                      onPress={() => this.kurang()}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: -5,
                        top: -5,
                        backgroundColor: 'red',
                        height: 20,
                        width: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'white'}}>{this.state.total}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity style={{position: 'absolute', right: 10, bottom: 10}}>
          <View style={styles.tombol}>
            <Icon name="cart" color="white" size={30} />
          </View>
          <Text style={{fontWeight: 'bold'}}> Lanjut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kategori: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
  },
  tombol: {
    height: 50,
    width: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  category: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pajangan: {width: '100%', height: 100, backgroundColor: 'deepskyblue'},
  barang: {width: 100, backgroundColor: 'white', elevation: 3, margin: 5},
});
