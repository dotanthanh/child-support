import { observable, action, computed } from 'mobx';
import firebase from 'react-native-firebase';
import AuthStore from './auth';
import {random} from 'lodash';
class UserStore {
  @observable database = firebase.database();
  @observable userdata = {};
  @observable babydata = {
    activities: [],
    due_date: undefined
  };
  @observable feelings_data = [
    // {week: 1, feeling_rate:  2},
    // {week: 4, feeling_rate: 3},
    // {week: 5, feeling_rate: 4},
    // {week: 6, feeling_rate: 5}
  ];

  @action
  fetchUserData = () => {
    // only fetch if we have a logged in user
    if (AuthStore.user) {
      this.database
        .ref(`users/${AuthStore.user.uid}`)
        .once('value', (userSnapshot) => {
          this.userdata = userSnapshot.val();
          this.feelings_data = userSnapshot.child('feelings_data').val();
          this.database
            .ref(userSnapshot.val().baby)
            .once('value', (babySnapshot) => {
              this.babydata = babySnapshot.val();
            });
        });
    }
  };
}

export default new UserStore();
