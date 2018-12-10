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
import RegisterScreen from './src/components/RegisterScreen';
<<<<<<<<< Temporary merge branch 1
import AdminHomeScreen from './src/components/admin/AdminScreen';
import AdminQuestionAnswer from './src/components/admin/AdminQuestionAnswer';
import UserIdentifier from './src/components/UserIdentifier';
=========
import QAScreen from './src/components/QAScreen';
>>>>>>>>> Temporary merge branch 2
import AuthStore from './src/stores/auth';
import { shouldShowQuestion } from './src/utils/user';
import ProfileScreen from './src/components/ProfileScreen';

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
<<<<<<<<< Temporary merge branch 1
    Profile: ProfileScreen,
    Register: RegisterScreen,
    Logout: LogoutScreen
=========
    Logout: LogoutScreen,
    Register: RegisterScreen,
    QuestionAnswer: QAScreen
>>>>>>>>> Temporary merge branch 2
  },
  // { initialRouteName: 'Home' }
  { initialRouteName: 'Profile' }
);

const AdminDrawer = createDrawerNavigator(
  {
    Home: AdminHomeScreen,
    AdminQuestionAnswer: AdminQuestionAnswer,
    Logout: LogoutScreen 
  },
  { initialRouteName: 'AdminQuestionAnswer' }
)

const getUserAppStack = (shouldShowQuestion) => createSwitchNavigator(
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

const AdminAppStack = createSwitchNavigator(
  {
    Home: AdminDrawer
  },
  { initialRouteName: 'Home' }
);

const getAppStack = (shouldShowQuestion) => createSwitchNavigator(
  {
    User: getUserAppStack(shouldShowQuestion),
    Admin: AdminAppStack,
    AuthGateway: UserIdentifier
  },
  { initialRouteName: 'AuthGateway' }
)

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