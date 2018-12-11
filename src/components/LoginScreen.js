import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView,
  Keyboard, Animated, ScrollView, AlertIOS
} from 'react-native';
import { Text, FormInput, Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import LandingImage from '../../assets/pregnancy.png';
import auth from '../stores/auth';
import { colors, text, shadow } from '../styles/theme';
import { container as containerStyle } from '../styles';

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

  onRegister = () => {
    this.props.navigation.navigate('Register');
  };

  onLogin = async () => {
    const { email, password } = this.state;
    try {
      await auth.login(email, password);
      this.props.navigation.navigate('AuthGateway');
    } catch (e) {
      AlertIOS.alert('Your email and password are wrong');
    }
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
    };

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          {!inputFocused && (
            <Text h3 style={styles.title}>PREGMIND</Text>
          )}
          <Animated.Image source={LandingImage} style={imageStyle} />
        </View>
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          <View style={styles.form}>
            <FormInput
              {...inputProps}
              placeholder='Email'
              leftIcon={{ name: 'Email' }}
              onChangeText={this.onChangeEmail}
              value={email}
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <FormInput
              secureTextEntry
              {...inputProps}
              placeholder='Password'
              leftIcon={{ name: 'password' }} 
              onChangeText={this.onChangePassword}
              value={password}
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
            />
            <View style={styles.buttonGroup}>
              <Button
                rounded
                buttonStyle={styles.button}
                color={colors.white}
                title="REGISTER"
                textStyle={styles.buttonText}
                onPress={this.onRegister}
              />
              <Button
                rounded
                buttonStyle={styles.button}
                color={colors.white}
                title="LOGIN"
                textStyle={styles.buttonText}
                onPress={this.onLogin}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...containerStyle.screenContainer,
    backgroundColor: colors.lightBlue
  },
  headerContainer: {
    paddingTop: 64,
    paddingBottom: 48,
    alignItems: 'center',
  },
  title: {
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: text.boldWeight
  },
  formContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    height: 'auto',
    paddingBottom: 36,
    paddingTop: 24,
    flexGrow: 1,
    paddingHorizontal: 36,
    ...shadow,
    shadowOffset: { height: -2 }
  },
  form: {
    flex: 1,
    maxWidth: 300
  },
  buttonGroup: {
    flexDirection: 'row',
    marginVertical: 24,
    justifyContent: 'center'
  },
  button: {
    width: 100,
    backgroundColor: colors.main,
    paddingHorizontal: 16,
    ...shadow
  },
  buttonText: {
    fontWeight: text.bolderWeight,
    fontSize: 12
  },
  inputContainer: {
    borderBottomWidth: 0
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 12,
    width: 'auto',
    borderColor: colors.line,
    borderRadius: 4
  }
});
