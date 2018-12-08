import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';
import { pickBy } from 'lodash';

import { mapObjectToArrayWithId } from '../utils';

class QuestionAnswerStore {
  @observable topics = [];
  @observable questions = [];
  database = firebase.database();

  @action
  fetchTopics = async () => {
    try {
      await this.database.ref(`question_topic`)
        .once('value', (snapshot) => {
          const value = snapshot.val();
          this.topics = mapObjectToArrayWithId(value);
        });
    } catch (e) {
      console.log(e);
    }
  };

  @action
  fetchTopicQuestions = async (topicId) => {
    try {
      await this.database.ref('user_questions/')
        .once('value', snapshot => {
          const allQuestion = snapshot.val()
          const topicQuestions = pickBy(allQuestion, (question) => {
            return question.is_answered
              && question.topic_id === topicId;
          });
          this.questions = mapObjectToArrayWithId(topicQuestions);
        })
    } catch (e) {
      console.log(e);
    } 
  }

  @action
  submitQuestion = async (question, topicId) => {
    try {
      throw new Error()
      await this.database.ref('user_questions/').push({
        answer: "",
        is_answered: false,
        text: question,
        topic_id: topicId
      });
    } catch (e) {
      throw e;
    }
  };
}

export default new QuestionAnswerStore();

