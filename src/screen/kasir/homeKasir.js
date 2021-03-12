import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default class HomeKasir extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
    };
  }
  lihat = () => {
    const url = `https://master-of-sale.herokuapp.com/api/kasir`;

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
        console.log('ini kasir', resjson.data[0]);
        this.setState({data: resjson.data[0]});
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
      <View style={styles.viewTopU}>
        <View style={styles.viewLogin}>
          <View style={styles.headerBg}>
            <Image
              source={require('../../assets/icon/sort-button-with-three-lines.png')}
              style={styles.headerIcon}
            />

            <Image
              source={require('../../assets/icon/round-account-button-with-user-inside.png')}
              style={styles.headerIconRight}
            />
          </View>

          <View style={styles.headerDash}>
            <Image
              source={require('../../assets/icon/city-buildings-silhouette.png')}
              style={styles.dashIcon}
            />

            <Text style={styles.headerText}>
              {this.state.data.name} {this.state.data.alamat}
            </Text>
          </View>

          <View style={styles.category}>
            <TouchableOpacity style={styles.textContainer}>
              <Image
                source={require('../../assets/icon/city-buildings-silhouette.png')}
                style={styles.categoryIcon}
              />

              <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Sale</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textContainer}>
              <Image
                source={require('../../assets/icon/city-buildings-silhouette.png')}
                style={styles.categoryIcon}
              />

              <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                Transaction
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textContainer}>
              <Image
                source={require('../../assets/icon/city-buildings-silhouette.png')}
                style={styles.categoryIcon}
              />

              <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                Inventory
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MemberKasir')}
              style={styles.textContainer}>
              <Image
                source={require('../../assets/icon/city-buildings-silhouette.png')}
                style={styles.categoryIcon}
              />

              <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Members</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=>this.props.navigation.navigate('KategoryBarangKasir')}
              style={styles.textContainer}>
              <Image
                source={require('../../assets/icon/city-buildings-silhouette.png')}
                style={styles.categoryIcon}
              />

              <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Category</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textContainer}>
              <Image
                source={require('../../assets/icon/city-buildings-silhouette.png')}
                style={styles.categoryIcon}
              />

              <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.keluar()}
          style={{
            height: 50,
            width: '95%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            marginVertical: 5,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Keluar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBg: {
    marginTop: 5,
    paddingHorizontal: 15,
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
    resizeMode: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
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
  },

  textContainer: {
    width: '40%',
    height: 90,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
  },
  category: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 20,
  },
  text: {
    paddingLeft: 10,
  },
  viewTopU: {
    alignItems: 'center',
    flex: 1,
    paddingTop: '2.5%',
    backgroundColor: 'deepskyblue',
  },

  headerIcon: {
    width: 35,
    height: 35,
    marginRight: '40%',
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
});
