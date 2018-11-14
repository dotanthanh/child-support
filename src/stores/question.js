import { action } from 'mobx';
import firebase from 'react-native-firebase';

import AuthStore from './auth';
import { calculateCurrentDay } from '../utils/user';

class QuestionStore {
  database = firebase.database();

  @action
  getUserAnswers = () => {
    return this.dailyAnswers.map(answer => answer.user);
  }

  @action
  submitAnswer = async (answerObject) => {
    const { userAnswer, babyAnswer } = answerObject;
    try {
      const userRef = this.database.ref(`users/${AuthStore.user.uid}`);
      const user =  await userRef.once('value').then(snapshot => snapshot.val());
      const babyRef = this.database.ref(user.baby);
      const baby = await babyRef.once('value').then(snapshot => snapshot.val());
      const currentDay = calculateCurrentDay(baby.due_date);
      // save mother/spouse answer
      await userRef.child('feelings_data')
        .set([
          ...user.feelings_data,
          {
            feeling_rate: userAnswer,
            day: currentDay
          }
        ]);
      // save baby answer
      await babyRef.child('activities')
        .set([...baby.activities, ...babyAnswer]);
    } catch (e) {
      console.log(e);
    }
  };
}

export default new QuestionStore();
