import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import {View, Text} from 'react-native';
import { observer } from 'mobx-react';

import HomeScreen from './src/components/HomeScreen';

import LoginScreen from './src/components/LoginScreen';
import DailyQuestionScreen from './src/components/DailyQuestion';
import LogoutScreen from './src/components/Logout';
import AuthStore from './src/stores/auth';

@observer
export default class App extends React.Component {
  componentWillUnmount() {
    // remove observer for user's sign in state
    AuthStore.unsubscriber();
  }

  render() {
    const RootStacks = getRootStacks(
      Boolean(AuthStore.user),
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

const getAppStack = (questionEnable) => createSwitchNavigator(
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
    },
    Chat: {
      screen: () => <View><Text>keke</Text></View>
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
