import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import BottomBar from './BottomBar';
import { container as containerStyles, iconButton, subSection } from '../styles';
import { colors, button, text } from '../styles/theme';
import QuestionAnswerStore from '../stores/questionanswer';
import QuestionForm from './QuestionForm';

@observer
export default class QAScreen extends React.Component {
  state = {
    formOpened: true
  };

  componentDidMount() {
    QuestionAnswerStore.fetchTopics();
  }

  toggleForm = () => {
    this.setState({ formOpened: !this.state.formOpened });
  };

	render() {
    const { navigation } = this.props;
    const { formOpened } = this.state;
    const topics = QuestionAnswerStore.topics;

    return formOpened ? (
      <QuestionForm closeForm={this.toggleForm} />
    ) : (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="Q&A" />

        <ScrollView style={styles.contentContainer}>
          {/* <View style={styles.newQuestion}>
            <Button
              rounded
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              iconRight={{name: 'add', style: styles.icon, size: 30}}
              title='Ask'
              onPress={this.toggleForm}
            />
          </View> */}
          <View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Topic</Text>
            </View>
            <View style={styles.topicsContainer}>
              {topics.map(topic => (
                <Topic key={topic.id} topic={topic} navigation={navigation} />
              ))}
            </View>
          </View>
        </ScrollView>

        <BottomBar currentView='QuestionAnswer' />
      </View>
    );
  }
}

const Topic = (props) => {
  const { topic, navigation  } = props;
  const navigate = () => navigation.navigate('TopicQuestion', { topicId: topic.id});

  return (
    <TouchableOpacity onPress={navigate}>
      <View style={styles.topic}>
        <Text style={styles.topicText}>{topic.text}</Text>
        <Button
          containerViewStyle={{marginRight: 0}}
          iconRight={{
            name: 'chevron-right',
            size: 25,
            style: {color: colors.black}
          }}
          buttonStyle={styles.topicButton}
        />
      </View>
    </TouchableOpacity>
  );
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16
  },
  icon: {
    ...iconButton
  },
  button: {
    ...button.default,
    paddingVertical: 8,
    paddingHorizontal: 24
  },
  buttonText: {
    fontWeight: text.bolderWeight
  },
  subHeader: {
    backgroundColor: colors.lightBlue,
    ...subSection.header
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: text.boldWeight
  },
  topicsContainer: {
  },
  topic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: colors.line
  },
  topicText: {
    fontSize: 16
  },
  topicButton: {
    padding: 0,
    backgroundColor: 'transparent',
    ...iconButton
  }
});