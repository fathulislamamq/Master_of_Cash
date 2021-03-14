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
// import CheckBox from '@react-native-community/checkbox';

export default class PengeluaranStaff extends Component {
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
                  {/* <Image
                  source={require('../../assets/icon/snacks.png')}
                  style={styles.categoryIcon}
                /> */}
                  <Text style={styles.categoryText}>Pengeluaran</Text>
                </View>
                <Image
                  source={require('../../assets/icon/round-account-button-with-user-inside.png')}
                  style={styles.headerIconRight}
                />
              </View>
              {/* <View style={styles.headerDash}>
              <Image
                source={require('../../assets/icon/city-buildings-silhouette.png')}
                style={styles.dashIcon}
              />
              <Text style={styles.headerText}>Dashboard</Text>
            </View> */}
              <View style={styles.listContainer}>
                {/* <Image
                  source={require('../../assets/icon/watch.png')}
                  style={styles.listIcon}
                /> */}
                <View>
                  <Text style={styles.listText}>Tanggal</Text>
                  <Text style={styles.qtyText}>Listrik: $30</Text>
                  <Text style={styles.qtyText}>Bensin: $60</Text>
                </View>
                <Text
                  style={{...styles.hargaText, textAlign: 'right', flex: 1}}>
                  $500
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: 1,
                }}
              />

              <View style={styles.listContainer}>
                {/* <Image
                  source={require('../../assets/icon/watch.png')}
                  style={styles.listIcon}
                /> */}
                <View>
                  <Text style={styles.listText}>Tanggal</Text>
                  <Text style={styles.qtyText}>Listrik: $30</Text>
                  <Text style={styles.qtyText}>Bensin: $60</Text>
                </View>
                <Text
                  style={{...styles.hargaText, textAlign: 'right', flex: 1}}>
                  $500
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: 1,
                }}
              />

              <View style={styles.listContainer}>
                {/* <Image
                  source={require('../../assets/icon/watch.png')}
                  style={styles.listIcon}
                /> */}
                <View>
                  <Text style={styles.listText}>Tanggal</Text>
                  <Text style={styles.qtyText}>Listrik: $30</Text>
                  <Text style={styles.qtyText}>Bensin: $60</Text>
                </View>
                <Text
                  style={{...styles.hargaText, textAlign: 'right', flex: 1}}>
                  $500
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  height: 1,
                }}
              />

              <View style={styles.listContainer}>
                {/* <Image
                  source={require('../../assets/icon/watch.png')}
                  style={styles.listIcon}
                /> */}
                <View>
                  <Text style={styles.listText}>Tanggal</Text>
                  <Text style={styles.qtyText}>Listrik: $30</Text>
                  <Text style={styles.qtyText}>Bensin: $60</Text>
                </View>
                <Text
                  style={{...styles.hargaText, textAlign: 'right', flex: 1}}>
                  $500
                </Text>
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
              <Text style={styles.bottomText}>Total Item: 10,</Text>
              <Text style={styles.totalText}>Harga: $85</Text>
            </View>
            <View
              style={{
                // backgroundColor: 'blue',
                // marginRight: -50,
                textAlign: 'right',
                flex: 1,
                width: 90,
                // height: 25,
                // borderWidth: 3,
                // marginLeft: '30%',
                marginTop: -15,
                // borderRadius: 8,
                // backgroundColor: 'blue',
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: 'blue',
                }}>
                $2000
              </Text>
            </View>
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
    marginRight: 100,
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
    marginRight: '5%',
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
  // header: {
  //   backgroundColor: '#4c9b8d',
  //   alignItems: 'center',
  // },
  // headerBg1: {
  //   paddingHorizontal: 15,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   height: 50,
  //   resizeMode: 'center',
  // },
  headerView: {
    // color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  viewLogin: {
    width: '95%',
    height: '90%',
    backgroundColor: '#004c90',
    elevation: 10,
    borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: '20%',
    // flex: 1,
  },
  // viewLogin1: {
  //   width: '95%',
  //   backgroundColor: '#cccccc',
  //   elevation: 10,
  //   borderRadius: 10,
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   paddingTop: '5%',
  //   flex: 2,
  // },

  categoryContainer: {
    width: '35%',
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
    minHeight: 70,
    // height: 60,
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