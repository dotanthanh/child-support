import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Keyboard, Animated, ScrollView } from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';

import LandingImage from '../assets/pregnancy.png';

export class LoginScreen extends React.Component {
  state = {
    inputFocused: false,
    imageSize: new Animated.Value(200),
    email: '',
    password: ''
  };

  shrinkImageAnimation = Animated.timing(this.state.imageSize, {
    toValue: 100,
    duration: 1000
  });

  expandImageAnimation = Animated.timing(this.state.imageSize, {
    toValue: 200,
    duration: 1000
  });

  componentDidMount() {
    Keyboard.addListener('keyboardWillShow', () => {
      this.setState({ inputFocused: true });
      this.shrinkImageAnimation.start();
    });
    Keyboard.addListener('keyboardWillHide', () => {
      this.setState({ inputFocused: false });
      this.expandImageAnimation.start();
    });
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners();
  }

  onLogin = () => {
    // some dummy validation here
    
  };

  onChangeUsername = (username) => this.setState({ username });

  onChangePassword = (password) => this.setState({ password });

  render() {
    const { imageSize, inputFocused, username, password } = this.state;

    const inputProps = {
      required: true,
      blurOnSubmit: false
    };
    const imageStyle = {
      height: imageSize,
      width: imageSize,
      marginVertical: 24
    };

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        keyboardShouldPersistTaps="never">
        {!inputFocused && (
          <Text h2 style={styles.title}>PregMind</Text>
        )}
        <Animated.Image source={LandingImage} style={imageStyle} />
        <KeyboardAvoidingView style={styles.form} behavior="padding">
          <FormLabel>Email</FormLabel>
          <FormInput
            {...inputProps}
            onChangeText={this.onChangeUsername}
            value={username}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            {...inputProps}
            onChangeText={this.onChangePassword}
            value={password}
          />
          <View style={styles.buttonGroup}>
            <Button buttonStyle={styles.button} color="white" title="Register" />
            <Button
              buttonStyle={styles.button}
              color="white"
              title="Login"
              onPress={this.onLogin}
          />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  form: {
    maxWidth: 300
  },
  buttonGroup: {
    flexDirection: 'row',
    marginVertical: 24,
    justifyContent: 'center'
  },
  button: {
    width: 100,
    backgroundColor: '#FA8D62',
    paddingHorizontal: 16
  }
});

export default LoginScreen;
