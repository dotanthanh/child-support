import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';
import Expo from 'expo';
import { isEmpty } from 'lodash';

class SessionStore {
  @observable storage = firebase.storage();
  @observable sessionInfo = '';
  @observable sessionNumber = undefined;
  @observable sessionAudio = undefined;

  @action
  changeSession = (sessionNumber) => {
    this.sessionInfo = '';
    this.sessionNumber = sessionNumber;
    this.sessionAudio = undefined;
  }

  @action
  fetchSessionText = async () => {
    const filePath = Expo.FileSystem.documentDirectory + 'info_mother.txt';
    try {
      const downloadUrl = await this.storage
        .ref(`/documents/session_${this.sessionNumber}/info_mother.txt`)
        .getDownloadURL();
      await Expo.FileSystem.downloadAsync(downloadUrl, filePath);
      await this.readSessionInfoToStore();
    } catch (e) {
      console.log(e);
    }
  }

  @action
  fetchSessionAudio = async () => {
    const filePath = Expo.FileSystem.documentDirectory + 'audio.mp3';
    try {
      const downloadUrl = await this.storage
        .ref(`/documents/session_${this.sessionNumber}/audio.mp3`)
        .getDownloadURL();
      await Expo.FileSystem.downloadAsync(downloadUrl, filePath)
      await Expo.Audio.Sound
        .create({uri: filePath}, {shouldPlay: false})
        .then(soundInfo => {
          this.sessionAudio = soundInfo.sound;
        });
    } catch (e) {
      console.log(e);
    } 
  }

  readSessionInfoToStore = async () => {
    await Expo.FileSystem
      .readAsStringAsync(Expo.FileSystem.documentDirectory + 'info_mother.txt')
      .then(content => this.sessionInfo = content)
      .catch(e => console.log(e));
  };
}

export default new SessionStore();