import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu' }}
          centerComponent={{ text: 'menu' }}
          rightComponent={{ icon: 'search' }}
        />
        <Text>This is the landing page, there should be popup question</Text>  
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
