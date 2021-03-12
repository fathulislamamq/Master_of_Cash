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

export default class DetailKategoryBarangKasir extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      angka: 1,
      ket: '',
      loading: false,
      token: '',
    };
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
                  
                  <Text style={styles.categoryText}>Category</Text>
                </View>
                <Image
                  source={require('../../assets/icon/round-account-button-with-user-inside.png')}
                  style={styles.headerIconRight}
                />
              </View>
              
              <View style={styles.listContainer}>
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
                  <Text style={styles.listText}>Call of Fantasy</Text>
                  <Text style={styles.qtyText}>Qty: 98</Text>
                </View>
                <Text style={styles.listText}>$500</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: -25,
                    borderRadius: 8,
                    width: 50,
                    height: 30,
                    marginTop: 40,
                    borderWidth: 3,
                    backgroundColor: '#00264b',
                  }}>
                  <Text
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: 1,
                }}
              />

              <View style={styles.listContainer}>
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
                  <Text style={styles.listText}>COS</Text>
                  <Text style={styles.qtyText}>Qty: 98</Text>
                </View>
                <Text style={styles.listText}>$500</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: -25,
                    borderRadius: 8,
                    width: 50,
                    height: 30,
                    marginTop: 40,
                    borderWidth: 3,
                    backgroundColor: '#00264b',
                  }}>
                  <Text
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: 1,
                }}
              />

              <View style={styles.listContainer}>
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
                  <Text style={styles.listText}>PZ 3</Text>
                  <Text style={styles.qtyText}>Qty: 98</Text>
                </View>
                <Text style={styles.listText}>$500</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: -25,
                    borderRadius: 8,
                    width: 50,
                    height: 30,
                    marginTop: 40,
                    borderWidth: 3,
                    backgroundColor: '#00264b',
                  }}>
                  <Text
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: 1,
                }}
              />

              <View style={styles.listContainer}>
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
                  <Text style={styles.listText}>PZ TIVA</Text>
                  <Text style={styles.qtyText}>Qty: 98</Text>
                </View>
                <Text style={styles.listText}>$500</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: -25,
                    borderRadius: 8,
                    width: 50,
                    height: 30,
                    marginTop: 40,
                    borderWidth: 3,
                    backgroundColor: '#00264b',
                  }}>
                  <Text
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: 1,
                }}
              />

              
            </ScrollView>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.bottomText}>Items: 10,</Text>
              <Text style={styles.totalText}>Harga: $85</Text>
            </View>
            <TouchableOpacity
              style={{
                marginLeft: 5,
                width: 70,
                height: 25,
                borderWidth: 3,
                marginLeft: '35%',
                marginTop: -15,
                borderRadius: 8,
                backgroundColor: 'blue',
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Buy
              </Text>
            </TouchableOpacity>
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
    width: '30%',
    height: 90,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
  },
  listContainer: {
    width: '94%',
    height: 100,
    backgroundColor: '#bbe1fd',
    paddingTop: '5%',
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