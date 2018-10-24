import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Animated,
	KeyboardAvoidingView,
	Alert
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

import LandingImage from '../assets/pregnancy.png';

onChangeFirstName = (firstName) => this.setState({ firstName });

onChangeLastName = (lastName) => this.setState({ lastName });

onChangeEmail = (email) => this.setState({ email });

onChangeStatus = (status) => this.setState({ status });

onChangePassword = (password) => this.setState({ password });

export default class RegisterScreen extends React.Component {
	state = {
	    inputFocused: false,
	    firstName: '',
	    lastName: '',
	    email: '',
	    status: '',
	    password: ''
	  };

	render() {
		const { inputFocused, firstName, lastName, email, status, password } = this.state;
		const inputProps = {
	      required: true,
	      blurOnSubmit: false
	    };
		return (
			<View style={styles.regform}>

				<KeyboardAvoidingView style={styles.form} behavior="padding">

					<View style={styles.header}>
						<Animated.Image source={LandingImage} style={styles.headerImage} />

						<Text style={styles.headerText}>Registration</Text>
					</View>

					<FormLabel>First name *</FormLabel>
			        <FormInput
			            {...inputProps}
			            onChangeText={this.onChangeFirstName}
			            value={firstName}
			          />

			        <FormLabel>Last name *</FormLabel>
			        <FormInput
			            {...inputProps}
			            onChangeText={this.onChangeFirstName}
			            value={lastName}
			         />

			        <FormLabel>Email *</FormLabel>
			        <FormInput
			            {...inputProps}
			            onChangeText={this.onChangeFirstName}
			            value={email}
			         />

			        <FormLabel>Relationship status</FormLabel>
			        <FormInput
			            {...inputProps}
			            onChangeText={this.onChangeFirstName}
			            value={status}
			        />

			        <FormLabel>Password *</FormLabel>
			        <FormInput
			        	secureTextEntry
			            {...inputProps}
			            onChangeText={this.onChangeFirstName}
			            value={password}
			        />

			        <Text>Please fill in all the gaps marked with a (*)</Text>

	        		<TouchableOpacity style={styles.button} 
	        		onPress={ () => this.props.navigation.navigate('Login')}>

	        			<Text style={styles.btntext}>Create</Text>
	        		</TouchableOpacity>

        		</KeyboardAvoidingView>


      		</View>
		);
	}
};

const styles = StyleSheet.create({
  regform: {
  	alignSelf: 'stretch',
  	paddingLeft: 60,
    paddingRight: 60
  },
  header: {
  	alignSelf: 'stretch',
  	backgroundColor: '#4e8393',
  	top: 0,
  	height: 100,
  	paddingTop: 30,
  	flexDirection: 'row',
  	marginBottom: 20
  },
  headerText: {
  	color: '#ec926b',
  	fontSize: 18,
  	marginLeft: 20,
  	marginTop: 20
  },
  headerImage: {
  	left: 10,
  	height: 50,
    width: 50,
    alignSelf: 'center',
    marginBottom: 30
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
  button: {
  	width: 100,
    backgroundColor: '#FA8D62',
    paddingHorizontal: 16,
    marginTop: 20
  },
  btntext: {
  	color: '#909b99'
  }
});