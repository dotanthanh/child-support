import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
	Animated,
	KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { FormLabel, FormInput, Button, CheckBox } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {isEmpty} from 'lodash';

import { container as containerStyles } from '../styles';
import { colors, text, shadow } from '../styles/theme';
import FormHeader from '../custom/FormHeader';
import AuthStore from '../stores/auth';

var userIsMother = [
	{label: "Mother", value: true},
	{label: "Spouse", value: false}
];

var userIsFirstTime = [
	{label: "Yes", value: true},
	{label: "No", value: false}
];

export class RegisterScreen extends React.Component {
	state = {
		name: '',
		isFirstTime: true,
		isMother: true,
		email: '',
		password: '',
		passwordConfirm: '',
		dueDate: undefined,
		dateOfBirth: undefined
	}

	getOnChange = (type) => {
		return (value) => {
			this.setState({ [type]: value });
		}
	}

	getOnCheckBox = (type) => {
		return () => {
			this.setState({ [type]: !this.state[type] })
		}
	};

	onCreateUser = () => {
		console.log(this.state)
		// if (this.validate && this.checkCanSend) {
		// 	AuthStore.signup(rest);
		// }
	};

	validate = () => {
		const { password, passwordConfirm, dateOfBirth, dueDate } = this.state;
		const now = moment();

		return password === passwordConfirm
			&& now.diff(dateOfBirth) > 0
			&& now.diff(dueDate, 'weeks') < 40;   
	}

	checkCanSend = () => {
		const {
			name, email, password, passwordConfirm,
			dateOfBirth, dueDate
		} = this.state;
		return !isEmpty(name)
			&& !isEmpty(email)
			&& !isEmpty(password)
			&& !isEmpty(passwordConfirm)
			&& !isEmpty(dateOfBirth)
			&& !isEmpty(dueDate);
	}

	goBack = () => {
		this.props.navigation.navigate('Login');
	}

	render() {
		const { isMother, isFirstTime, dateOfBirth, dueDate } = this.state;
		const canSubmit = this.checkCanSend();

		return (
			<View style={styles.container}>
				<FormHeader
					rightButtonProps={{
						title: 'Submit',
						onPress: this.onCreateUser,
						// loading: isSaving,
						disabled: !canSubmit
					}}
					leftButtonProps={{
						title: 'Cancel',
						onPress: this.goBack
					}}	
					headerName="Register"
				/>

				<ScrollView style={styles.contentContainer}>
					{/* <KeyboardAvoidingView behavior="padding"> */}
					<View>
						<FormInput
							placeholder="Your email"
							onChangeText={this.getOnChange('email')}
							inputStyle={styles.input}
							autoCapitalize="none"
							autoCorrect={false}
						/>
						<FormInput
							secureTextEntry
							placeholder="Password"
							inputStyle={styles.input}
							onChangeText={this.getOnChange('password')}
							autoCapitalize="none"
							autoCorrect={false}
						/>
						<FormInput
							secureTextEntry
							placeholder="Confirm password"
							inputStyle={styles.input}
							onChangeText={this.getOnChange('passwordConfirm')}
							autoCapitalize="none"
							autoCorrect={false}
						/>
						<FormInput
							placeholder="Your name"
							inputStyle={styles.input}
							onChangeText={this.getOnChange('name')}
							autoCapitalize="none"
							autoCorrect={false}
						/>

						<View style={styles.dateContainer}>
							<FormLabel labelStyle={styles.label}>Date of birth</FormLabel>
							<DatePicker
								customStyles={{ dateInput: styles.datePicker }}
								showIcon={false}
								style={styles.radioForm}
								date={this.state.date}
								mode="date"
								placeholder="Date of birth"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								onDateChange={this.getOnChange('dateOfBirth')}
								date={dateOfBirth}
							/>
						</View>

						<View style={styles.dateContainer}>
							<FormLabel labelStyle={styles.label}>Pregnancy due date</FormLabel>
							<DatePicker
								customStyles={{ dateInput: styles.datePicker }}
								showIcon={false}
								style={styles.radioForm}
								date={this.state.date}
								mode="date"
								placeholder="Date of birth"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								onDateChange={this.getOnChange('dueDate')}
								date={dueDate}
							/>
						</View>

						<View style={styles.checkboxField}>
							<FormLabel labelStyle={styles.label}>Are you the mother ?</FormLabel>
							<View style={styles.checkboxContainer}>
								<CheckBox
									checked={isMother}
									containerStyle={styles.checkbox}
									onPress={this.getOnCheckBox('isMother')}
								/>
							</View>
						</View>

						<View style={styles.checkboxField}>
							<FormLabel labelStyle={styles.label}>Is this your first time ?</FormLabel>
							<View style={styles.checkboxContainer}>
								<CheckBox
									checked={isFirstTime}
									containerStyle={styles.checkbox}
									onPress={this.getOnCheckBox('isFirstTime')}
								/>
							</View>
						</View>

					</View>
	    		{/* </KeyboardAvoidingView> */}
    		</ScrollView>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		...containerStyles.screenContainerMenu
	},
	contentContainer: {
		...containerStyles.screenContent
	},
  headerContainer: {
    paddingTop: 48,
    paddingBottom: 36,
    alignItems: 'center',
	},
	label: {
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0,
		fontWeight: text.bolderWeight,
		color: colors.black
	},
	dateContainer: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	datePicker: {
		borderRadius: 4
	},
	checkboxField: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	checkboxContainer: {
		flexDirection: 'row'
	},
	checkbox: {
		backgroundColor: 'transparent',
		borderWidth: 0
	},
  input: {
		paddingVertical: 12
  }
});

export default RegisterScreen;
