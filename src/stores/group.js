import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';

import { mapObjectToArrayWithId } from '../utils';

class GroupStore {
  @observable groups = [];
  database = firebase.database();

  @action
  fetchGroups = async () => {
    try {
      await this.database.ref('groups')
        .once('value', snapshot => {
          this.groups = mapObjectToArrayWithId(snapshot.val())
        })
  
    } catch (e) {
      console.log(e);
    }
  };
}

export default new GroupStore();
