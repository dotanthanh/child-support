import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

import { container as containerStyles } from '../../styles';
import { text, divider } from '../../styles/theme';
import AppHeaderStack from '../../custom/AppHeaderStack';

export class SettingScreen extends React.Component {
  
  // return a function to navigate to corresponding setting view
  getSettingNavigate = (settingRoute) => {
    return () => {
      this.props.navigation.navigate(settingRoute);
    };
  }

  render() {

    return (
      <View style={styles.container}>
        <AppHeaderStack viewName='SETTINGS' />

        <View style={styles.contentContainer}>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Profile</Text>

            <TouchableOpacity onPress={this.getSettingNavigate('NameSetting')}>
              <View style={styles.field}>
                <Text style={styles.fieldText}>Name</Text>
                <Icon name='chevron-right' />
              </View>
            </TouchableOpacity>

          </View>
          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionText}>Privacy and security</Text>

            <TouchableOpacity onPress={this.getSettingNavigate('PasswordSetting')}>
              <View style={styles.field}>
                <Text style={styles.fieldText}>Password</Text>
                <Icon name='chevron-right' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.getSettingNavigate('PrivacySetting')}>
              <View style={styles.field}>
                <Text style={styles.fieldText}>Account privacy</Text>
                <Icon name='chevron-right' />
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    ...divider
  },
  container: {
    ...containerStyles.screenContainerMenu
  },
  contentContainer: {
    ...containerStyles.screenContent
  },
  section: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  sectionText: {
    fontWeight: text.boldWeight,
    fontSize: 16,
    paddingVertical: 8
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  fieldText: {
    fontSize: 16
  }
});

export default SettingScreen;
