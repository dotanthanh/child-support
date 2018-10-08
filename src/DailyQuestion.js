import React from 'react';
import { View, Text, Picker, StyleSheet, Slider } from 'react-native';
import { Button } from 'react-native-elements';

export default class DailyQuestion extends React.Component {
  state = {
    userAnswer: 0,
    babyAnswer: 0
  };

  submitAnswer = () => {
    // do something before move to home screen
    console.log(this.state);
    this.moveToHomeScreen();
  }

  moveToHomeScreen = () => {
    this.props.navigation.navigate('Home'); 
  }

  onUserAnswerChange = (value) => this.setState({ userAnswer: value });

  onBabyAnswerChange = (value) => this.setState({ babyAnswer: value });

  render() {
    const { userAnswer, babyAnswer } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.question}>
          <Text style={styles.questionText}>How are you doing today ?</Text>
          <Slider
            step={1}
            minimunValue={1}
            maximumValue={10}
            value={userAnswer}
            onValueChange={this.onUserAnswerChange}
          />
          <View style={styles.tracks}>
            <Text style={styles.track}>1</Text>
            <Text style={styles.track}>{userAnswer !== 0 && userAnswer}</Text>
            <Text style={styles.track}>10</Text>
          </View>
        </View>
        <View style={styles.question}>
          <Text style={styles.questionText}>How is your baby doing ?</Text>
          <Picker onValueChange={this.onBabyAnswerChange} selectedValue={babyAnswer}>
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Sleepy" value="sleepy" />
            <Picker.Item label="Kicking" value="kicking" />
          </Picker>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            containerViewStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.submitAnswer}
            title="Done"
          />
          <Button
            containerViewStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.moveToHomeScreen}
            title="Skip"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 36
  },
  button: {
    backgroundColor: '#FA8D62'
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  buttonContainer: {
    width: '50%'
  },
  tracks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 36
  },
  question: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 72
  },
  track: {
    // TODO: styling for slide's trackers 
  }
});
