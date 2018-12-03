import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

import AuthStore from './auth';

class QuestionStore {
  database = firebase.database();
  @observable questions = [];

  @action
  fetchQuestions = () => {
    this.database
      .ref('user_questions')
      .once('value', (snapshot) => {
        this.questions = snapshot.val() || [];
      });
  }

  @action
  submitAnswer = async (answer, index) => {
    const updatedQuestion = {
      ...this.questions[index],
      answer,
      is_answered: true
    }
    await this.database
      .ref(`user_questions/${index}`)
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
  //     // submitted_by: AuthStore.user.uid
  //   }
  //   let questionsList = [];
  //   await this.database
  //     .ref('user_questions')
  //     .once('value', (snapshot) => {
  //       questionsList = snapshot.val() || [];
  //     })
  //   questionsList.push(question);
  //   await this.database
  //     .ref('user_questions')
  //     .set(questionsList, (snapshot) => {
  //       // do something after successfully submitted question
  //     })
  // }
}

export default new QuestionStore();
