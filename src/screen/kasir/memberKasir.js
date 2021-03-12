import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class MenberKasir extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
    };
  }

  lihat = () => {
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.vh}>
          <Text style={styles.th}>Daftar Member</Text>
        </View>

        <View style={{flex: 1, backgroundColor: 'deepskyblue'}}>
          <ScrollView>
            {this.state.data.map((v, i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditMember', {v: v})
                  }
                  key={i}
                  style={styles.lb}>
                  <Image
                    source={require('../../assets/icon/round-account-button-with-user-inside.png')}
                    style={styles.imgMbr}
                  />
                  <View style={{flexDirection: 'row', marginLeft: 5}}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>nama</Text>

                      <Text style={{fontWeight: 'bold'}}>id</Text>

                      <Text style={{ fontWeight: 'bold' }}>kode member</Text>
                      
                      <Text style={{fontWeight: 'bold'}}>telepon</Text>

                      <Text style={{fontWeight: 'bold'}}>alamat</Text>
                    </View>
                    <View>
                      <Text> : {v.name}</Text>

                      <Text> : {v.id}</Text>

                      <Text> : {v.kode_member}</Text>

                      <Text> : {v.telepon}</Text>
                      
                      <Text> : {v.alamat}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('RegisterMember')}
          style={styles.rmb}>
          <View style={styles.vpm}>
            <Icon name="add" size={30} color="white" />
          </View>

          <Text style={{fontWeight: 'bold', color: 'grey'}}>Add Member</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vh: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
  },
  th: {fontWeight: 'bold', fontSize: 20},
  viewTopU: {
    alignItems: 'center',
    flex: 1,
    paddingTop: '2.5%',
  },
  lb: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5,
  },
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    elevation: 5,
    marginBottom: 5,
  },

  imgMbr: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
});

export default MenberKasir;
