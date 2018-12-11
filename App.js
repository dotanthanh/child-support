import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { observer } from 'mobx-react';
import { Audio } from 'expo';

import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';
import DailyQuestionScreen from './src/components/DailyQuestion';
import LogoutScreen from './src/components/Logout';
import RegisterScreen from './src/components/RegisterScreen';
import AdminHomeScreen from './src/components/admin/AdminScreen';
import AdminQuestionAnswer from './src/components/admin/AdminQuestionAnswer';
import UserIdentifier from './src/components/UserIdentifier';
import QAScreen from './src/components/QAScreen';
import AuthStore from './src/stores/auth';
import { shouldShowQuestion } from './src/utils/user';
import ProfileScreen from './src/components/ProfileScreen';
import TopicScreen from './src/components/TopicScreen';
import SettingStack from './src/components/user-settings';
import SessionStack from './src/components/session';
import GroupStack from './src/components/group';

@observer
export default class App extends React.Component {
  state = { questionOpen: false };

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true
    });
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

const QuestionAnswerStack = createStackNavigator(
  {
    QuestionAnswer: QAScreen,
    TopicQuestions: TopicScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'QuestionAnswer'
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Settings: SettingStack
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none'
  }
);

const AppDrawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Sessions: SessionStack,
    QuestionAnswer: QuestionAnswerStack,
    Groups: GroupStack,
    Profile: ProfileStack,
    Logout: LogoutScreen
  },
  // { initialRouteName: 'Sessions' }
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
    Register: RegisterScreen,
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