import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from './src/HomeScreen';
import LoginScreen, { WaitingLoginScreen } from './src/LoginScreen';

export default class App extends React.Component {
  render() {
    return (
      <RootStacks />
    );
  }
}

const AppStack = createStackNavigator({
  Home: HomeScreen
});

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null }
    },
    LoggingIn: {
      screen: WaitingLoginScreen,
      navigationOptions: { header: null }
    }
  },
  { initialRouteName: 'Login' }
);

const RootStacks = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth'
  }
);
