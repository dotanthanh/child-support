import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import BottomBar from './BottomBar';

class SessionsScreen extends React.Component {
  goToSingleSession = (sessionNumber) => {
    // return a curried function
    return () => {
      this.props.navigation.navigate(
        'SingleSession',
        { sessionNumber }
      );
    };
  }

  render() {
    let sessions = [];
    for (let i = 0; i < 40; i++) {
      sessions.push(i + 1);
    }
    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="SESSIONS" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {sessions.map(sessionNumber => (
            <Button
              onPress={this.goToSingleSession(sessionNumber)}
              containerViewStyle={styles.sessionButtonContainer}
              buttonStyle={styles.sessionButton}
              key={sessionNumber}
              title={`Session ${sessionNumber}`}
              textStyle={styles.buttonText}
            />
          ))}
        </ScrollView>
        <BottomBar currentView='Sessions' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollView: {
    paddingTop: 12,
    alignItems: 'center'
  },
  sessionButtonContainer: {
    marginBottom: 12,
    minWidth: '70%',
    shadowOffset: { height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.4 
  },
  sessionButton: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C4F0EA'
  },
  buttonText: {
    fontWeight: '500',
    color: '#333333'
  }
});

// export default withMenu(SessionsScreen, 'Sessions');
export default SessionsScreen;
