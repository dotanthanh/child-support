import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import AppHeaderStack from '../custom/AppHeaderStack';
import BottomBar from './BottomBar';

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
    flex: 1
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

export default SingleSessionScreen;
