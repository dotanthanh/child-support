import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
	Animated,
	KeyboardAvoidingView,
  	ScrollView,
  	TextInput,
  	TouchableHighlight,
  	AlertIOS
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { addQuestion } from '../stores/questionanswer';
import { addAnswer } from '../stores/questionanswer';

import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import BottomBar from './BottomBar';
import QAList from './QAList';
import { container as containerStyles } from '../styles';
import { colors, text, shadow } from '../styles/theme';

import AuthStore from '../stores/auth';
import LandingImage from '../../assets/pregnancy.png';

export default class DailyQuestion extends React.Component {

	constructor(props) {
      super(props);
      this.state = {
        name: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      this.setState({
        name: e.nativeEvent.text
      });
    }
    handleSubmit() {
      addQuestion(this.state.name);
      AlertIOS.alert(
        'Question saved successfully'
       );
    }

	render() {

    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="Q&A" />
        <ScrollView contentContainerStyle={styles.scrollView}>
        	<Text style={styles.title}>
        	Ask a question
        	</Text>
        <TextInput
              style={styles.itemInput}
              onChange={this.handleChange}
            />
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
              	  rounded
                  style={styles.buttonText}>
                  Add
              </Text>
            </TouchableHighlight>
        </ScrollView>

        <QAList />

        <BottomBar currentView='QuestionAnswer' />
      </View>
    );

  }

}

const styles = StyleSheet.create({
  	container: {
    ...containerStyles.screenContainerMenu
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  button: {
    width: 150,
    marginTop: 10,
    padding: 5,
    backgroundColor: colors.main,
    paddingHorizontal: 16,
    ...shadow,
    justifyContent: 'center' 
  },
  buttonText: {
    fontWeight: text.bolderWeight,
    fontSize: 12,
    textAlign: 'center' 
  }
});