import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Slider, Icon,
  Text as HeaderText } from 'react-native-elements';
import { observer } from 'mobx-react';
import { keys, includes } from 'lodash';

import { colors, text, shadow } from '../styles/theme';
import { container as containerStyle } from '../styles';
import BabyStore from '../stores/baby';
import QuestionStore from '../stores/question';
import { feelingIconNames } from '../contants';
import { cacheQuestion } from '../utils/user';

@observer
export class DailyQuestion extends React.Component {
  state = {
    userAnswer: 1,
    babyAnswer: []
  };

  componentDidMount() {
    BabyStore.fetchActivitySet();
  }

  submitAnswer = () => {
    // do something before move to home screen
    QuestionStore.submitAnswer(this.state);
    this.moveToHomeScreen();
  }

  moveToHomeScreen = async () => {
    // cache the information so the question not popup again during the day
    await cacheQuestion();
    this.props.navigation.navigate('Home'); 
  }

  onUserAnswerChange = (value) => {
    const roundedValue = Math.round(value);
    this.setState({ userAnswer: roundedValue });
  }

  onBabyAnswerChange = (value) => {
    let babyAnswer = this.state.babyAnswer;
    const answer = parseInt(value);
    const shouldPop = includes(babyAnswer, answer);
    // remove selection if it is selected already
    if (shouldPop) {
      babyAnswer = babyAnswer.filter(activityId => activityId !== answer);
    } else {
      babyAnswer.push(answer);
    }
    this.setState({ babyAnswer });
  };

  renderActivitySelections = () => {
    const { babyAnswer } = this.state;
    return keys(BabyStore.activities_set).map(
      (selectionValue) => {
        const activityId = parseInt(selectionValue);
        const selected = includes(babyAnswer, activityId);
        const onPress = () => this.onBabyAnswerChange(activityId);
        const activityName = BabyStore.activities_set[activityId].name; 
        return (
          <Button
            onPress={onPress}
            containerViewStyle={selectionStyles.container}
            key={activityName}
            textStyle={selectionStyles.text(selected)}
            buttonStyle={selectionStyles.button(selected)}
            title={activityName}
            rounded
          />
        );
      }
    );
  };

  render() {
    const { userAnswer } = this.state;
    const thumbWidth = 48;
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
        // for some weird reasons the slider from the library
        // has an extra space of 20, this is hotfix
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
        <HeaderText h4 style={styles.pageTitle}>Daily Questions</HeaderText>
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
                name: feelingIconNames[userAnswer],
                size: 16,
                color: colors.black
              }}
            />
          </View>
        </View>
        <View style={styles.question}>
          <Text style={styles.questionText}>How is your baby doing ?</Text>
          <View style={styles.selectionGrid}>
          {this.renderActivitySelections()}
          </View>
        </View>
        <View style={styles.buttonGroup}>
          {/* an useless element to hack the flex-position */}
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

// different stylings for selected and non-selected button
const selectionStyles = {
  container: {
    marginLeft: 4,
    marginRight: 4
  },
  button: (selected) => ({
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderColor: selected ? colors.main : colors.line,
    marginVertical: 4,
    backgroundColor: selected ? colors.main : 'transparent'
  }),
  text: (selected) => ({
    textAlign: 'center',
    color: selected ? colors.white : colors.black,
    fontWeight: text.bolderWeight,
    fontSize: 12
  })
};

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
  }
});

export default DailyQuestion;
