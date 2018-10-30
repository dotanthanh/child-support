import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';

import AuthStore from './auth';

class UserStore {
  @observable database = firebase.database();
  @observable userdata = undefined;
  @observable babydata = undefined;

  @action
  fetchUserData = () => {
    // only fetch if we have a logged in user
    if (AuthStore.user) {
      this.database
        .ref(`users/${AuthStore.user.uid}`)
        .once('value', (userdata) => {
          this.userdata = userdata;
          this.database.ref(userdata.baby).once('value', (babydata) => {
            this.babydata = babydata;
          });
        });
    }
  }
}

export default new UserStore();
