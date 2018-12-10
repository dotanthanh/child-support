import { createStackNavigator } from 'react-navigation';

import SessionsScreen from './SessionsScreen';
import SingleSessionScreen from './SingleSessionScreen';

const SessionStack = createStackNavigator(
  {
    Sessions: SessionsScreen,
    SingleSession: SingleSessionScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'Sessions'
  }
);

export default SessionStack;
