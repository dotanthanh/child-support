import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from './src/LoginScreen';

export default class App extends React.Component {

  render() {
    return (
      <RootStacks />
    );
  }
}

const RootStacks = createStackNavigator(
  {
    Landing: {
      screen: LoginScreen,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: 'Landing'
  }
);
