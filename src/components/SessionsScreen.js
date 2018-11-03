import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import BottomBar from './BottomBar';
import { container as containerStyles } from '../styles';
import { shadow, colors, text } from '../styles/theme';

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

const sessionItemSize = (Dimensions.get('window').width - 12 * 2) / 3 - 8 * 2;

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  scrollView: {
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  sessionButtonContainer: {
    margin: 8,
    marginLeft: 8,
    marginRight: 8,
    width: sessionItemSize,
    height: sessionItemSize,
    ...shadow
  },
  sessionButton: {
    height: '100%',
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: colors.lightBlue
  },
  buttonText: {
    fontWeight: text.boldWeight,
    color: colors.black,
    textAlign: 'center'
  }
});

// export default withMenu(SessionsScreen, 'Sessions');
export default SessionsScreen;
