import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import BottomBar from './BottomBar';
import { container as containerStyles, iconButton, subSection } from '../styles';
import { colors, button, text } from '../styles/theme';
import QuestionAnswerStore from '../stores/questionanswer';

@observer
export class QAScreen extends React.Component {
  componentDidMount() {
    QuestionAnswerStore.fetchTopics();
  }

  navigate = (topic) => {
    this.props.navigation.navigate('TopicQuestions', { topic });
  }

	render() {
    const topics = QuestionAnswerStore.topics;

    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="Q&A" />

        <ScrollView style={styles.contentContainer}>
          <View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Topic</Text>
            </View>
            <View style={styles.topicsContainer}>
              {topics.map(topic => (
                <Topic
                  key={topic.id}
                  topic={topic}
                  navigate={() => this.navigate(topic)}
                />
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
  const { topic, navigate  } = props;

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

Topic.propTypes = {
  navigate: PropTypes.func,
  topic: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  contentContainer: {
    ...containerStyles.screenContent
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

export default QAScreen;
