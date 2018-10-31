import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AuthStore from '../stores/auth';

export default class Logout extends React.Component {
  componentDidMount() {
    // TODO: logout action here, then redirect to Login screen
    AuthStore.logout();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h4>Logging out ...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
