import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Slider, Icon,
  Text as HeaderText } from 'react-native-elements';
import { parseInt } from 'lodash';

import { colors, text, shadow } from '../styles/theme';
import { container as containerStyle } from '../styles';

export default class DailyQuestion extends React.Component {
  state = {
    userAnswer: 1,
    babyAnswer: ''
  };

  submitAnswer = () => {
    // do something before move to home screen
    this.moveToHomeScreen();
  }

  moveToHomeScreen = () => {
    this.props.navigation.navigate('Home'); 
  }

  onUserAnswerChange = (value) => {
    const roundedValue = Math.round(value);
    this.setState({ userAnswer: roundedValue });
  }

  onBabyAnswerChange = (value) => this.setState({ babyAnswer: value });

  render() {
    const { userAnswer, babyAnswer } = this.state;
    const feelingIconScale = [
      'sentiment-very-dissatisfied',
      'sentiment-very-dissatisfied',
      'mood-bad',
      'mood-bad',
      'sentiment-dissatisfied',
      'sentiment-dissatisfied',
      'sentiment-satisfied',
      'sentiment-satisfied',
      'sentiment-very-satisfied',
      'sentiment-very-satisfied'
    ];
    const thumbWidth = 52;
    const thumbTouchSize = 10;
    const ratio = (userAnswer - 1) / 9.0;
    const thumbStyles = {
      thumbTouch: {
        borderWidth: 0.5,
        borderColor: colors.line
      },
      thumbContainer: {
        width: thumbWidth,
        alignItems: 'center',
        marginTop: -12,
        marginLeft: thumbWidth / -2 + thumbTouchSize - 20 * ratio,
        left: `${ratio * 100.0}%`
      },
      thumb: {
        marginTop: -4,
        paddingHorizontal: 4,
        paddingVertical: 4,
        backgroundColor: colors.main,
        width: thumbWidth
      },
      thumbText: {
        fontWeight: text.bolderWeight,
        fontSize: 10 
      }
    };

    return (
      <View style={styles.container}>
        <HeaderText h4 style={styles.pageTitle}>Daily Question</HeaderText>
        <View style={styles.question}>
          <Text style={styles.questionText}>How are you doing today ?</Text>
          <Slider
            thumbTouchSize={{ height: thumbTouchSize, width: thumbTouchSize }}
            minimumTrackTintColor={colors.main}
            maximumTrackTintColor={colors.white}
            trackStyle={styles.track}
            thumbStyle={thumbStyles.thumbTouch}
            thumbTintColor={colors.white}
            step={1}
            minimumValue={1}
            maximumValue={10}
            value={userAnswer}
            onValueChange={this.onUserAnswerChange}
          />
          <View style={thumbStyles.thumbContainer}>
            <Icon name='arrow-drop-up' />
            <Button disabled rounded
              disabledStyle={thumbStyles.thumb}
              title={`${userAnswer}`}
              textStyle={thumbStyles.thumbText}
              iconRight={{
                name: feelingIconScale[userAnswer - 1],
                size: 16,
                color: colors.black
              }}
            />
          </View>
        </View>
        <View style={styles.question}>
          <Text style={styles.questionText}>How is your baby doing ?</Text>
          <View style={styles.selectionGrid}>
            {['Sleeping', 'Kicking', 'Active', 'Other'].map(title => (
              <Button
                containerViewStyle={styles.selectionContainer}
                key={title}
                textStyle={styles.selectionText}
                buttonStyle={styles.selection}
                title={title}
                rounded
              />
            ))}
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            disabled
            disabledStyle={{backgroundColor: 'transparent'}}
            title='Skip'
            textStyle={{ color: 'transparent' }}
          />
          <Button
            rounded
            containerViewStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.submitAnswer}
            title="SAVE"
          />
          <Button
            buttonStyle={{backgroundColor: 'transparent', padding: 0}}
            textStyle={{color: colors.black, fontWeight: text.bolderWeight, fontSize: 14}}
            onPress={this.moveToHomeScreen}
            title='Skip'
            iconRight={{ name: 'arrow-forward', color: colors.black }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...containerStyle.screenContainer,
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.lightBlue,
  },
  pageTitle: {
    letterSpacing: 2,
    fontWeight: text.boldWeight,
    color: colors.black
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12
  },
  button: {
    backgroundColor: colors.main,
    paddingHorizontal: 16
  },
  buttonText: {
    fontSize: 16,
    fontWeight: text.bolderWeight,
    color: colors.white
  },
  buttonContainer: {
    flex: 1,
    ...shadow
  },
  question: {
    padding: 24,
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 4,
    ...shadow
  },
  questionText: {
    fontWeight: text.bolderWeight,
    fontSize: 14,
    color: colors.black,
    marginBottom: 16
  },
  track: {
    borderWidth: 0.5,
    borderColor: colors.line,
  },
  selectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  selectionContainer: {
    marginLeft: 4,
    marginRight: 4
  },
  selection: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: colors.line,
    marginVertical: 4
  },
  selectionText: {
    textAlign: 'center',
    color: colors.black,
    fontWeight: text.bolderWeight,
    fontSize: 12
  }
});
