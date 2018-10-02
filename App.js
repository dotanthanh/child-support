import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';

export default class App extends React.Component {
  state = {
    showImage: true
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h2 style={styles.title}>PregMind</Text>
        <Image source={require('./assets/pregnancy.png')} style={styles.image} />
        <KeyboardAvoidingView style={styles.form} behavior="padding" on>
          <FormLabel>Email</FormLabel>
          <FormInput require />
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry required />
          <View style={styles.buttonGroup}>
            <Button title="Register" />
            <Button title="Login" />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 36,
    paddingRight: 36 
  },
  title: {
    marginTop: 24,
    letterSpacing: 2
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginVertical: 24
  },
  form: {
    maxWidth: 300
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24
  }
});
