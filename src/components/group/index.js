import { createStackNavigator } from 'react-navigation';

import GroupScreen from './GroupScreen';
import SingleGroupScreen from './SingleGroupScreen';

const GroupStack = createStackNavigator(
  {
    Groups: GroupScreen,
    SingleGroup: SingleGroupScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'Groups'
  }
);

export default GroupStack;
