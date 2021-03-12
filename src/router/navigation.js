import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Splash from '../screen/splash';
import Login from '../auth/login';
import HomeKasir from '../screen/kasir/homeKasir';
import HomePimpinan from '../screen/pimpinan/homePimpinan';
import HomeMember from '../screen/member/homeMember';
import HomeStaff from '../screen/staff/homeStaff';
import Forpass from '../auth/forpass';
import Kasir from './kasir';
import MemberKasir from '../screen/kasir/memberKasir';
import RegisterMember from '../auth/registerMember';
import EditMember from '../screen/kasir/editMember';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailKategoryKasir from '../screen/kasir/detailKategoryKasir';
import KategoryBarangKasir from './kasir';

const Stack = createStackNavigator();
const Top = createMaterialTopTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forpass" component={Forpass} />

        {/* untuk Kasir */}
        <Stack.Screen name="kasir" component={HomeKasir} />
        <Stack.Screen name="MemberKasir" component={MemberKasir} />
        <Stack.Screen name="RegisterMember" component={RegisterMember} />
        <Stack.Screen name="EditMember" component={EditMember} />
        <Stack.Screen
          name="KategoryBarangKasir"
          component={KategoryBarangKasir}
        />
        <Stack.Screen
          name="DetailKategoryKasir"
          component={DetailKategoryKasir}
        />
        {/* untuk Pimpinan */}
        <Stack.Screen name="pimpinan" component={HomePimpinan} />
        {/* untuk Member */}
        <Stack.Screen name="member" component={HomeMember} />
        {/* untuk Staff */}
        <Stack.Screen name="staff" component={HomeStaff} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
