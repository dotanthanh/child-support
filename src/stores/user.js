import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';

import AuthStore from './auth';

class UserStore {
  @observable database = firebase.database();
  @observable userdata = {};
  @observable babydata = {};
  @observable feelings_data = [];
  @observable joinedGroups = [];
  @observable updatingImage = false;

  @action
  fetchUserData = async () => {
    // only fetch if we have a logged in user
    if (AuthStore.user) {
      await this.database
        .ref(`users/${AuthStore.user.uid}`)
        .once('value', (userSnapshot) => {
          this.userdata = userSnapshot.val();
          this.feelings_data = userSnapshot.child('feelings_data').val() || [];
          this.joinedGroups = userSnapshot.child('joined_groups').val() || [];
          this.database
            .ref(this.userdata.baby)
            .once('value', (babySnapshot) => {
              this.babydata = babySnapshot.val();
            })
        })
        .catch(e => console.log(e));
    }
  };

  @action
  updateProfilePicture = async (imgUri) => {
    this.updatingImage = true;
    try {
      const uploadedImage = await firebase.storage()
        .ref(`users_data/${AuthStore.user.uid}/profile_picture.jpg`)
        .putFile(imgUri);

      const imageUrl = uploadedImage.downloadURL;
      await this.updateAccount({ profile_image: imageUrl });
      await this.fetchUserData();
    } catch (e) {
      console.log(e);
    }
    this.updatingImage = false;
  }

  @action
  updateAccount = async (updateObject) => {
    try {
      await this.database
        .ref(`users/${AuthStore.user.uid}`)
        .update(updateObject);
      await this.fetchUserData();
    } catch (e) {
      throw e;
    }
  }
}

export default new UserStore();
