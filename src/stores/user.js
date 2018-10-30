import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';

import AuthStore from './auth';

class UserStore {
  @observable database = firebase.database();
  @observable userdata = undefined;
  @observable babydata = {
    activities: [],
    due_date: undefined
  };

  @action
  fetchUserData = () => {
    // only fetch if we have a logged in user
    if (AuthStore.user) {
      this.database
        .ref(`users/${AuthStore.user.uid}`)
        .once('value', (userSnapshot) => {
          this.userdata = userSnapshot.val();
          this.database
            .ref(userSnapshot.val().baby)
            .once('value', (babySnapshot) => {
              this.babydata = babySnapshot.val();
            });
        });
    }
  }
}

export default new UserStore();
