import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Login from './src/auth/login'
import Navigation from './src/router/navigation'
import Splash from './src/screen/splash'

export default class App extends Component {
  render() {
    return (
      <Navigation />
    )
  }
}
