// import firebase from 'react-native-firebase';

// export const addQuestion =  (item) => {
//     firebase.database().ref('user_questions/').push({
//     	answer: "",
//     	is_answered: false,
//         text: item
//     });
// }

// export const addAnswer =  (item) => {
    
// }
import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

import { mapObjectToArrayWithId } from '../utils';

class QuestionAnswerStore {
  @observable topics = [];
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
  submitQuestion = async (question, topicId) => {
    try {
      await this.database().ref('user_questions/').push({
        answer: "",
        is_answered: false,
        text: question,
        topic_id: topicId
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export default new QuestionAnswerStore();

