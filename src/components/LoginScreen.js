import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView,
  Keyboard, Animated, ScrollView
} from 'react-native';
import { Text, FormLabel, FormInput, Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import LandingImage from '../../assets/pregnancy.png';
import auth from '../stores/auth';

@observer
export default class LoginScreen extends React.Component {
  state = {
    inputFocused: false,
    imageSize: new Animated.Value(200),
    email: '',
    password: ''
  };
  keyBoardWillShowListener = null;
  keyBoardWillHideListener = null;

  shrinkImageAnimation = Animated.timing(this.state.imageSize, {
    toValue: 100,
    duration: 500
  });

  expandImageAnimation = Animated.timing(this.state.imageSize, {
    toValue: 200,
    duration: 500
  });

  componentDidMount() {
    if (auth.user) {
      this.props.navigation.navigate('Logging');
    }
    this.keyBoardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      this.setState({ inputFocused: true });
      this.shrinkImageAnimation.start();
    });
    this.keyBoardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      this.setState({ inputFocused: false });
      this.expandImageAnimation.start();
    });
  }

  componentWillUnmount() {
    this.keyBoardWillShowListener.remove();
    this.keyBoardWillHideListener.remove();
  }

  onLogin = () => {
    const { email, password } = this.state;
    // some dummy validation her
    auth.login(email, password);
  };

  onChangeEmail = (email) => this.setState({ email });

  onChangePassword = (password) => this.setState({ password });

  render() {
    const { imageSize, inputFocused, email, password } = this.state;

    const inputProps = {
      required: true
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
        keyboardShouldPersistTaps="handled">
        {!inputFocused && (
          <Text h2 style={styles.title}>PregMind</Text>
        )}
        <Animated.Image source={LandingImage} style={imageStyle} />
        <KeyboardAvoidingView style={styles.form} behavior="padding">
          <FormLabel>Email</FormLabel>
          <FormInput
            {...inputProps}
            onChangeText={this.onChangeEmail}
            value={email}
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
