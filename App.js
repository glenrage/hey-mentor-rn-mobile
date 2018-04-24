import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import HomeAuth from './screens/HomeAuth';
import Welcome from './screens/Welcome';
import Notifications from './screens/Notifications';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: Welcome },
      home: { screen: HomeAuth },
      notifications: { screen: Notifications }
    });
    return <MainNavigator />;
  }
}
