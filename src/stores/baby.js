import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';
import {random} from 'lodash';

class BabyStore {
  @observable database = firebase.database();
  @observable activities_set = [];

  @action
  fetchActivitySet = () => {
    this.database
      .ref('activities_set')
      .once('value', (activitySnapshot) => {
        this.activities_set = activitySnapshot.val()
      })
      .catch(e => console.log(error));
  }
}

export default new BabyStore();
