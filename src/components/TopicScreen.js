import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import QuestionForm from './QuestionForm';
import AppHeaderStack from '../custom/AppHeaderStack';
import BottomBar from './BottomBar';
import { container as containerStyles, iconButton } from '../styles';
import { colors, button, text, border } from '../styles/theme';
import QAStore from '../stores/questionanswer';

@observer
export class TopicScreen extends React.Component {
  state = {
    formOpened: false,
    openedQuestionId: ''
  }

  componentDidMount = () => {
    const { navigation: { state: { params } } } = this.props;
    const topicId = params.topic.id;
    QAStore.fetchTopicQuestions(topicId);
  }

  toggleQuestion = (questionId) => {
    const { openedQuestionId } = this.state;

    if (questionId === openedQuestionId) {
      this.setState({ openedQuestionId: ' '});
    } else {
      this.setState({ openedQuestionId: questionId })
    }
  }

  toggleForm = () => {
    this.setState({ formOpened: !this.state.formOpened });
  }

  render() {
    const { navigation: { state: { params } } } = this.props;
    const { formOpened, openedQuestionId } = this.state;
    const topicId = params.topic.id;

    return formOpened ? (
      <QuestionForm topicId={topicId} closeForm={this.toggleForm} />
    ) : (
      <View style={styles.container}>
        <AppHeaderStack viewName='Topic' />

        <View style={styles.contentContainer}>
          <View style={styles.newQuestion}>
            <Text style={styles.topic}>
              {params.topic.text}
            </Text>
            <Button
              rounded
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              iconRight={{name: 'add', style: styles.icon, size: 24}}
              title='Ask'
              onPress={this.toggleForm}
            />
          </View>
          {QAStore.questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              opened={openedQuestionId === question.id}
              toggleQuestion={this.toggleQuestion}
            />
          ))}
        </View>

        <BottomBar currentView="QuestionAnswer" />
      </View>
    )
  }
}

const Question = (props) => {
  const { question, opened, toggleQuestion } = props;
  const onClickQuestion = () => toggleQuestion(question.id);

  return (
    <TouchableOpacity onPress={onClickQuestion}>
      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question.text}</Text>
          <Icon name={opened ? 'expand-less' : 'expand-more'} /> 
        </View>
        {opened && (
          <Text style={styles.answer}>{question.answer}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  opened: PropTypes.bool,
  toggleQuestion: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  contentContainer: {
    ...containerStyles.screenContent
  },
  newQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: border.color,
    borderBottomWidth: border.width
  },
  topic: {
    fontSize: 16,
    fontWeight: text.boldWeight
  },
  icon: {
    ...iconButton
  },
  button: {
    ...button.default,
    paddingVertical: 4,
    paddingHorizontal: 12
  },
  buttonText: {
    fontWeight: text.bolderWeight,
    fontSize: 14
  },
  questionContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  question: {
    fontWeight: text.boldWeight
  },
  answer: {
    padding: 16,
    fontStyle: 'italic'
  }
});

export default TopicScreen;
