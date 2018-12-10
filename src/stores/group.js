import { action, observable } from 'mobx';
import firebase from 'react-native-firebase';
import { contain } from 'lodash';

import { mapObjectToArrayWithId } from '../utils';
import UserStore from './user';
import AuthStore from './auth';

class GroupStore {
  @observable groups = [];
  @observable members = [];
  database = firebase.database();

  @action
  fetchGroups = async () => {
    try {
      await this.database.ref('groups')
        .once('value', snapshot => {
          this.groups = mapObjectToArrayWithId(snapshot.val());
        })
  
    } catch (e) {
      console.log(e);
    }
  };

  @action
  joinGroup = async (group) => {
    try {
      const userGroups = UserStore.joinedGroups;
      const userGroupObject = {
        id: group.id,
        name: group.name
      };
      const groupMembers = this.groups.find(g => g.id === group.id).members || [];
      const memberObject = {
        id: AuthStore.user.uid,
        name: UserStore.userdata.name,
        picture_url: UserStore.userdata.profile_image
      }
      // check if the member is already exist in group
      if (groupMembers.filter(member => member.id === AuthStore.user.uid).length > 0
        || userGroups.filter(g => g.id === group.id).length > 0
      ) {
        throw new Error('Member already joined');
      }

      // add user to group's members list
      await this.database.ref(`groups/${group.id}/members`)
        .set([...groupMembers, memberObject]);
      // add group to user's joined groups list
      await UserStore.updateAccount({ joined_groups: [...userGroups, userGroupObject] });
      await this.fetchGroups();
    } catch (e) {
      console.log(e)
      throw e;
    }
  }

  @action
  leaveGroup = async (groupId) => {
    try {
      const userGroups = UserStore.joinedGroups;
      const groupMembers = this.groups.find(g => g.id === groupId).members || [];
      
      await this.database.ref(`groups/${groupId}/members`)
        .set(groupMembers.filter(member => member.id !== AuthStore.user.uid));
      await UserStore.updateAccount({
        joined_groups: userGroups.filter(group => group.id !== groupId)
      });
      await this.fetchGroups();
    } catch (e) {
      console.log(e)
      throw e;
    }
  }
}

export default new GroupStore();
