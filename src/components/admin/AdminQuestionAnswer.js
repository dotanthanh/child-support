import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import { Text as HeaderText, Button, Icon, FormInput } from 'react-native-elements';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import AppHeaderSwitch from '../../custom/AppHeaderSwitch';
import QuestionStore from '../../stores/userQuestion';
import { container as containerStyles } from '../../styles';
import { colors, text, shadow } from '../../styles/theme';

@observer
class QuestionAnswerScreen extends React.Component {
  state = {
    openedQuestionIndex: -1,
    answer: ''
  }

  componentDidMount() {
    QuestionStore.fetchQuestions();
  }

  toggleQuestion = (index) => {
    if (index === this.state.openedQuestionIndex) {
      this.setState({ openedQuestionIndex: -1 });
    } else {
      this.setState({ openedQuestionIndex: index, answer: '' });
    }
  }

  onChangeAnswer = (text) => {
    this.setState({ answer: text })
  }

  resetState = () => {
    this.setState({ openedQuestionIndex: -1, answer: '' });
  }

  renderQuestions = ({ index, item: question }) => {
    const { openedQuestionIndex, answer } = this.state;
    const isOpened = index === openedQuestionIndex;
    const toggleQuestion = () => this.toggleQuestion(index)
    const submitAnswer = async () => {
      await QuestionStore.submitAnswer(answer, index);
      this.resetState();
    }

    return (
      <View>
        <TouchableOpacity onPress={toggleQuestion} style={styles.question}>
          <View style={{ flex: 1 }}>
            <Text style={styles.questionText}>{question.text}</Text>
          </View>
          <Icon name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
        </TouchableOpacity>
        {isOpened && (
          <View>
            <FormInput
              placeholder='Give your answer'
              onChangeText={this.onChangeAnswer}
              value={answer}
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
              autoCorrect={false}
              multiline
              numberOfLines={10}
            />
            <Button
              rounded
              title="Submit"
              buttonStyle={styles.button}
              onPress={submitAnswer}
            />
          </View>
        )} 
      </View>
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="Q&A" />
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionHeader}>
            <Text style={styles.headerStyle}>Unanswered questions</Text>
          </View>
          {isEmpty(QuestionStore.questions) && (
            <View>
              <Text>All questions are answered !</Text>
            </View>
          )}
          <FlatList
            // extraData ensures that the list will re-render as the state changes
            extraData={this.state}
            data={QuestionStore.questions.filter(question => !question.is_answered)}
            renderItem={this.renderQuestions}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  scrollView: {
    flex: 1,
    width: '100%'
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between'
  },
  questionText: {
    fontSize: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: text.boldWeight
  },
  inputContainer: {
    borderWidth: 0.2,
    borderRadius: 4,
    marginLeft: 16,
    marginRight: 16
  },
  input: {
    width: '100%',
    padding: 12,
    paddingTop: 12,
    fontSize: 14
  },
  button: {
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 12,
    backgroundColor: colors.main
  }
});

export default QuestionAnswerScreen;
