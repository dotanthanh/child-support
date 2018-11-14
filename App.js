import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { observer } from 'mobx-react';
import firebase from 'react-native-firebase';
const x = firebase.storage();

import HomeScreen from './src/components/HomeScreen';

import LoginScreen from './src/components/LoginScreen';
import DailyQuestionScreen from './src/components/DailyQuestion';
import LogoutScreen from './src/components/Logout';
import SingleSessionScreen from './src/components/SingleSessionScreen';
import SessionsScreen from './src/components/SessionsScreen';
import RegisterScreen from './src/components/RegisterScreen';
import AuthStore from './src/stores/auth';
import { shouldShowQuestion } from './src/utils/user';

@observer
export default class App extends React.Component {
  state = { questionOpen: false };

  async componentDidMount() {
    const questionOpen = await shouldShowQuestion();
    this.setState({ questionOpen });
  }

  componentWillUnmount() {
    // remove observer for user's sign in state
    AuthStore.unsubscriber();
  }

  render() {
    const { questionOpen } = this.state;
    const RootStack = getRootStacks(Boolean(AuthStore.user), questionOpen);
    return (
      <RootStack />
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

const AppDrawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Sessions: SessionStack,
    Logout: LogoutScreen,
    Register: RegisterScreen
  },
  { initialRouteName: 'Home' }
);

const getAppStack = (shouldShowQuestion) => createSwitchNavigator(
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
  { initialRouteName: shouldShowQuestion ? 'DailyQuestion' : 'Home' }
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

const getRootStacks = (isLoggedIn, shouldShowQuestion) => createSwitchNavigator(
  {
    App: getAppStack(shouldShowQuestion),
    Auth: AuthStack
  },
  {
    initialRouteName: isLoggedIn ? 'App' : 'Auth'
  }
);