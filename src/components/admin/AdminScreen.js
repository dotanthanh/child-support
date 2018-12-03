import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AppHeaderSwitch from '../../custom/AppHeaderSwitch';
import AuthStore from '../../stores/auth';

export const AdminHomeScreen = () => (
  <View style={styles.container}>
    <AppHeaderSwitch viewName="HOME" />
    <Text style={styles.welcomeText}>
      Welcome to admin interface. Here you can answer users' questions, or do other management.
    </Text>
  </View>
);

export class QuestionAnswer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="HOME" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    paddingHorizontal: 48,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 2
  }
});

export default AdminHomeScreen
