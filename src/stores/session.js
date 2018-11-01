import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';
import Expo from 'expo';

class SessionStore {
  @observable storage = firebase.storage();
  @observable sessionInfo = '';

  @action
  fetchSessionText = (sessionNumber) => {
    this.storage.ref(`/documents/session_${sessionNumber}/info_mother.txt`)
    .getDownloadURL()
    .then((url) => {
      const filePath = Expo.FileSystem.documentDirectory + 'info_mother.txt'; 
      Expo.FileSystem
        .downloadAsync(url, filePath)
        .then(() => this.readSessionInfoToStore());
      console.log(url)
    })
    .catch(e => console.log(e));
  }

  readSessionInfoToStore = async () => {
    await Expo.FileSystem
      .readAsStringAsync(Expo.FileSystem.documentDirectory + 'info_mother.txt')
      .then(content => this.sessionInfo = content)
      .catch(e => console.log(e));
  };
}

export default new SessionStore();