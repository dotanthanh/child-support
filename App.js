import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { observer } from 'mobx-react';

import HomeScreen from './src/components/HomeScreen';

import LoginScreen from './src/components/LoginScreen';
import DailyQuestionScreen from './src/components/DailyQuestion';
import LogoutScreen from './src/components/Logout';
import SingleSessionScreen from './src/components/SingleSessionScreen';
import SessionsScreen from './src/components/SessionsScreen';
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

const SessionStack = createStackNavigator(
  {
    Sessions: SessionsScreen,
    SingleSession: SingleSessionScreen
  },
  {
    headerMode: 'none'
  }
);

const AppDrawer = createDrawerNavigator({
  Home: HomeScreen,
  Sessions: SessionStack,
  Logout: LogoutScreen
}, {initialRouteName: 'Sessions'});

const getAppStack = (questionEnable) => createSwitchNavigator(
  {
    Home: {
      screen: AppDrawer
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
