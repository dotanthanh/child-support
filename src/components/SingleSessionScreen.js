import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import AppHeaderStack from '../custom/AppHeaderStack';
import BottomBar from './BottomBar';
import { container as containerStyles } from '../styles';
import { colors, text, shadow } from '../styles/theme';

class SingleSessionScreen extends React.Component {
  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View style={styles.container}>
        <AppHeaderStack viewName={`Session ${params.sessionNumber}`} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text>kuku</Text>
        </ScrollView>
        <BottomBar currentView='Sessions' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  scrollView: {
    paddingTop: 12,
    alignItems: 'center'
  },
  sessionButtonContainer: {
    marginBottom: 12,
    minWidth: '70%',
    ...shadow
  },
  sessionButton: {
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue
  },
  buttonText: {
    fontWeight: text.boldWeight,
    color: colors.black
  }
});

export default SingleSessionScreen;
