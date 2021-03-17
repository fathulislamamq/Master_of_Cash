import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView,Alert} from 'react-native';

export default class HistoryTransaksiKasir extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
    };
  }

  member = () => {
    const url = `https://master-of-sale.herokuapp.com/api/penjualan/dibayar `;

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
        console.log('ini semua transaksi', resjson.data);
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
        this.member();
      } else {
        console.log('gak ada token');
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.hU}>
          <Text style={styles.tU}> History Transaksi </Text>
        </View>

        <View style={{flex: 1}}>
          <ScrollView>
            {this.state.data.map((v, k) => {
              return (
                <View
                  key={k}
                  style={styles.bT}>
                  <Text style={styles.tJU}>{v.barang.nama}</Text>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Merek</Text> :{' '}
                    {v.barang.merek}
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Qty</Text> :{' '}
                    {v.jumlah_barang}
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Total Harga</Text> :{' '}
                    {v.total_harga}
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Dibayar</Text> :{' '}
                    {v.dibayar}
                  </Text>

                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Kembelian</Text> :{' '}
                    {v.kembalian}
                  </Text>

                  <View style={{position:'absolute',bottom:5,right:5,alignItems:'flex-end'}}>
                    <Text>{v.updated_at}</Text>
                    <Text>{v.created_at}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hU: {
    height: 50,
    backgroundColor: '#158ac5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tU: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  bT: { margin: 10, backgroundColor: 'white', padding: 10, elevation: 5,borderRadius:10 },
  tJU:{fontWeight:'bold',fontSize:17,marginBottom:5}
});
