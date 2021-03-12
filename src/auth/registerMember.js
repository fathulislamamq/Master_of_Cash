import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class RegisterMember extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      token: '',
      name: '',
      email: '',
      telepon: '',
      password: '',
      password_confirmation: '',
      loading: false,
    };
  }

  daftar = () => {
    const {name, email, telepon, password, password_confirmation} = this.state;
    const url = 'https://master-of-sale.herokuapp.com/api/member';
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        telepon: telepon,
        password: password,
        password_confirmation: password_confirmation,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log('ini resjsonnya', resjson.data);
        if (resjson.status === 'success') {
          this.setState({data: resjson.data, loading: false});
          Alert.alert(
            'Berhasil',
            `Nama: ${this.state.data.name}` +
              `\nEmail: ${this.state.data.email}` +
              `\nKode Member: ${this.state.data.kode_member}` +
              `\nEmail: ${this.state.data.telepon}`,
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
                style: 'cancel',
              },
            ],
          );

          this.props.navigation.replace('MemberKasir');
        } else {
          console.log('ini json ', resjson.data);
          this.setState({loading: false});
          alert('Gagal Mendaftar Jadi Member');
        }
      })
      .catch((error) => {
        console.log('ini error ', error);
        alert('Ada Kesalahan Server');
        this.setState({loading: false});
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
      } else {
        console.log('gak ada token');
      }
    });
  }

  loading = () => {
    this.setState({loading: true});
  };
  render() {
    return (
      <View style={styles.utama}>
        {/* modal loading */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.loading}
          onRequestClose={() => this.setState({loading: false})}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0000008c',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 100,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={50} color="black" style={{margin: 10}} />
              <Text style={{margin: 10, fontWeight: 'bold'}}>
                Data Sedang di Proses . . .
              </Text>
            </View>
          </View>
        </Modal>

          <View style={styles.br}>
        <ScrollView>
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <Text style={{fontWeight: 'bold'}}> Master of Cash </Text>
              <Text style={{fontWeight: 'bold'}}> Member Register </Text>
            </View>

            <View style={{width: '100%', marginVertical: 15}}>
              <Text style={{fontWeight: 'bold'}}> Username </Text>

              <TextInput
                placeholder="Username"
                underlineColorAndroid="black"
                value={this.state.name}
                onChangeText={(t) => this.setState({name: t})}
              />

              <Text style={{fontWeight: 'bold'}}> Email </Text>

              <TextInput
                placeholder="Email"
                underlineColorAndroid="black"
                value={this.state.email}
                onChangeText={(t) => this.setState({email: t})}
              />

              <Text style={{fontWeight: 'bold'}}> Telepon </Text>

              <TextInput
                placeholder="Telepon"
                underlineColorAndroid="black"
                value={this.state.telepon}
                onChangeText={(t) => this.setState({telepon: t})}
              />

              <Text style={{fontWeight: 'bold'}}> Password </Text>

              <TextInput
                placeholder="Password"
                underlineColorAndroid="black"
                value={this.state.password}
                onChangeText={(t) => this.setState({password: t})}
                secureTextEntry={true}
              />

              <Text style={{fontWeight: 'bold'}}> Password Comfirmation </Text>

              <TextInput
                placeholder="Password Comfirmation"
                underlineColorAndroid="black"
                value={this.state.password_confirmation}
                onChangeText={(t) => this.setState({password_confirmation: t})}
              />
            </View>

            <TouchableOpacity onPress={() => this.daftar()} style={styles.tr}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                New Member
              </Text>
            </TouchableOpacity>
        </ScrollView>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  utama: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
  },
  br: {
    width: 330,
    height: 500,
    backgroundColor: 'white',
    padding: 5,
    elevation: 5,
    borderRadius: 15,
  },
  tr: {
    height: 50,
    margin: 5,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'black',
    elevation: 3,
  },
});
