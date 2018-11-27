import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
	Animated,
	KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from "react-native-datepicker";
import moment from "moment";

import { colors, text, shadow } from '../styles/theme';

import AuthStore from '../stores/auth';
import LandingImage from '../../assets/pregnancy.png';


var userIsMother = [
	{label: "Mother", value: true},
	{label: "Spouse", value: false}
];

var userIsFirstTime = [
	{label: "Yes", value: true},
	{label: "No", value: false}
];

var INITIAL_STATE = {
	    inputFocused: false,
			// current session should be calculated based on due date
	    current_session: 1,
	    name: '',
	    email: '',
	    feelings_data: [],
	    is_first_time: true,
	    is_mother: true,
	    date: moment(),
	    password: '',
	    error: null
	};

export default class RegisterScreen extends React.Component {


	onChangeEmail = (email) => this.setState({ email });

	onChangeIsFirstTime = (value) => this.setState({ is_first_time });

	onChangeIsMother = (value) => this.setState({ is_mother });

	onChangeName = (name) => this.setState({ name });

	onChangePassword = (password) => this.setState({ password });

  onChangePasswordTwo = (passwordTwo) => this.setState({ passwordTwo });

	onCreateUser = () => {
		const { error, inputFocused, ...rest } = this.state;
		AuthStore.signup(rest);
	};

	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	render() {
		const {
			inputFocused,
		  baby,
		  current_session,
	    email,
	    feelings_data,
	    is_first_time,
	    is_mother,
	    name,
	    password,
      passwordTwo,
      date,
	    error
		} = this.state;

    const isInvalid =
      password !== passwordTwo ||
      password === '' ||
      email === '' ||
      name === '';

		const inputProps = {
	      required: true,
	      blurOnSubmit: false
	    };
	    const imageStyle = {
	      height: 100,
	      width: 100,
	    };

		return (
    <ScrollView>
		<View style={styles.regform}>
		<KeyboardAvoidingView style={styles.form} behavior="padding">

			<View style={styles.headerContainer}>
        <Animated.Image source={LandingImage} style={imageStyle} />
      </View>

	    <View style={styles.regform}>
	        {this.state.errorMessage &&
	          <Text style={{ color: 'red' }}>
	            {this.state.errorMessage}
	          </Text>}
	        <FormInput
            placeholder="Full name"
           	{...inputProps}
           	onChangeText={this.onChangeName}
           	value={name}
           	inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            autoCapitalize="none"
            autoCorrect={false}
        	/>
	        <FormInput
	          placeholder="Email"
	          autoCapitalize="none"
	          inputStyle={styles.input}
            containerStyle={styles.inputContainer}
	          onChangeText={email => this.setState({ email })}
	          value={this.state.email}
	          autoCapitalize="none"
            autoCorrect={false}
	        />
	        <FormLabel>Status</FormLabel>
      			<View style={styles.container}>
               <RadioForm
                style={styles.radioForm}
								containerStyle={styles.radioForm}
								radio_props={userIsMother}
								initial={-1}
								onPress={(is_mother) => {this.status}}
								flexDirection='row'
               />
           </View>
           
           <FormLabel>First time pregnancy?</FormLabel>
           <View style={styles.container}>
               <RadioForm
                style={styles.radioForm}
								radio_props={userIsFirstTime}
								initial={-1}
								onPress={(is_first_time) => {this.status}}
								flexDirection='row' 
               />
           </View>

           <FormLabel>Due date</FormLabel>
           <View style={styles.container}>
              <DatePicker
                style={styles.radioForm}
                date={this.state.date}
                mode="date"
                placeholder="Select date"
                onDateChange={(date) => {this.setState({date: date})}}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
              />
           </View>

	        <FormInput
	          secureTextEntry
	          placeholder="Password"
	          autoCapitalize="none"
	          inputStyle={styles.input}
            containerStyle={styles.inputContainer}
	          onChangeText={password => this.setState({ password })}
	          value={this.state.password}
	        />

          <FormInput
            secureTextEntry
            placeholder="Confirm password"
            autoCapitalize="none"
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={passwordTwo => this.setState({ passwordTwo })}
            value={this.state.passwordTwo}
          />

	        <View style={styles.buttonGroup}>
		        <Button
							rounded
							buttonStyle={styles.button}
							color={colors.white}
							title="Create"
							textStyle={styles.buttonText}
              title="Sign Up"
              onPress={this.onCreateUser}
              disabled={isInvalid}
						/>

		        <Button
							rounded
							buttonStyle={styles.button}
							color={colors.white}
							title="Create"
							textStyle={styles.buttonText}
							title="Back"
							onPress={() => this.props.navigation.navigate('Login')}
		        />
	        </View>
        </View>

    		</KeyboardAvoidingView>
    		</View>
        </ScrollView>
		);
	}
};

const styles = StyleSheet.create({
  regform: {
  	alignSelf: 'stretch',
  	paddingLeft: 50,
    paddingRight: 40,
    backgroundColor: colors.lightBlue
  },
  headerContainer: {
    paddingTop: 48,
    paddingBottom: 36,
    alignItems: 'center',
  },
  form: {
    maxWidth: 300
  },
  textinput: {
  	alignSelf: 'stretch',
  	height: 20,
  	marginBottom: 30,
  	color: '#909b99',
  	borderBottomWidth: 1,
  	borderBottomColor: '#909b99'
  },
  radioForm: {
  	paddingLeft: 20,
    paddingTop: 5
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