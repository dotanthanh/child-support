import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

import AuthStore from './auth';
import { mapObjectToArrayWithId } from '../utils';

class QuestionStore {
  database = firebase.database();
  @observable questions = [];

  @action
  fetchQuestions = () => {
    this.database
      .ref('user_questions')
      .once('value', (snapshot) => {
        this.questions = mapObjectToArrayWithId(snapshot.val()) || [];
      });
  }

  @action
  submitAnswer = async (question) => {
    const updatedQuestion = {
      ...question,
      id: undefined,
      is_answered: true
    }
    await this.database
      .ref(`user_questions/${question.id}`)
      .set(updatedQuestion, () => {
        this.fetchQuestions();
      }); 
  }

  // @action
  // submitQuestion = async (questionData) => {
  //   const question = {
  //     // text: questionData.text,
  //     text: "How do I need to do to get response from the baby ?",
  //     answer: '',
  //     is_answered: false,
  //     submitted_by: AuthStore.user.uid
  //   }
  //   await this.database
  //     .ref('user_questions')
  //     .push(question, (snapshot) => {
  //       // do something after successfully submitted question
  //     })
  // }
}

export default new QuestionStore();
