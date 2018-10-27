import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';

import HomeScreen from './src/components/HomeScreen';

import LoginScreen from './src/components/LoginScreen';
import DailyQuestionScreen from './src/components/DailyQuestion';
import LogoutScreen from './src/components/Logout';
import auth from './src/stores/auth';

@observer
export default class App extends React.Component {
  componentWillUnmount() {
    // remove observer for user's sign in state
    auth.unsubscriber();
  }

  render() {
    const RootStacks = getRootStacks(
      Boolean(auth.user),
      false
    );
    return (
      <RootStacks />
    );
  }
}

const AppDrawer = createDrawerNavigator({
  Home: HomeScreen,
  Logout: LogoutScreen
});

const getAppStack = (questionEnable) => createStackNavigator(
  {
    Home: {
      screen: AppDrawer,
      navigationOptions: { header: null }
    },
    DailyQuestion: {
      screen: DailyQuestionScreen,
      navigationOptions: {
        title: 'Daily question'
      }
    }
  },
  {
    initialRouteName: questionEnable ? 'DailyQuestion' : 'Home'
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null }
    }
  },
  { initialRouteName: 'Login' }
);

const getRootStacks = (isLoggedIn, questionEnable) => createSwitchNavigator(
  {
    App: getAppStack(questionEnable),
    Auth: AuthStack
  },
  {
    initialRouteName: isLoggedIn ? 'App' : 'Auth'
  }
);
