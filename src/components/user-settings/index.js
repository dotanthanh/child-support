import { createStackNavigator } from 'react-navigation';

import SettingScreen from './SettingScreen';
import NameSetting from './NameSetting';
import PasswordSetting from './PasswordSetting';
import PrivacySetting from './PrivacySetting';

const SettingStack = createStackNavigator(
  {
    Settings: SettingScreen,
    NameSetting: NameSetting,
    PasswordSetting: PasswordSetting,
    PrivacySetting: PrivacySetting
  },
  {
    initialRouteName: 'Settings',
    headerMode: 'none' 
  }
);

export default SettingStack;
