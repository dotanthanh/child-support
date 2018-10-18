import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { observer } from 'mobx-react';

import HomeScreen from './src/components/HomeScreen';

import LoginScreen, { WaitingLoginScreen } from './src/components/LoginScreen';
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
    return (
      <RootStacks />
    );
  }
}

const AppDrawer = createDrawerNavigator({
  Home: HomeScreen,
  Logout: LogoutScreen
});

const AppStack = createStackNavigator(
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
    initialRouteName: 'DailyQuestion'
  }
);

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
