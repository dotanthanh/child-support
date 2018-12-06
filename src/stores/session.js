import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';
import Expo from 'expo';
import { isEmpty } from 'lodash';

import AuthStore from './auth';

class SessionStore {
  @observable storage = firebase.storage();
  @observable sessionInfo = '';
  @observable sessionExercise = '';
  @observable sessionReflection = '';
  @observable sessionNumber = undefined;
  @observable sessionAudio = undefined;
  @observable diaryAudio = undefined;

  @action
  changeSession = (sessionNumber) => {
    this.sessionInfo = '';
    this.sessionExercise = '';
    this.sessionReflection = '';
    this.sessionNumber = sessionNumber;
    this.sessionAudio = undefined;
  }

  @action
  fetchSessionText = async () => {
    await this.fetchSessionSection('info')
    await this.fetchSessionSection('exercise')
    await this.fetchSessionSection('reflection')
  }

  // fetch each section of a session: "info" | "exercise" | "reflection"
  @action
  fetchSessionSection = async (sectionName) => {
    const filePath = Expo.FileSystem.documentDirectory + `${sectionName}_mother.txt`;
    try {
      const downloadUrl = await this.storage
        .ref(`/documents/session_${this.sessionNumber}/${sectionName}_mother.txt`)
        .getDownloadURL();
      await Expo.FileSystem.downloadAsync(downloadUrl, filePath);
      await this.readSessionInfoToStore(sectionName);
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
      this.sessionAudio = await this.downloadAudio(downloadUrl, filePath);
    } catch (e) {
      console.log(e);
    }
  }

  /*
    general function for downloading a audio file and
    create a sound object using Expo API
  */
  @action
  downloadAudio = async (url, filePath) => {
    try {
      await Expo.FileSystem.downloadAsync(url, filePath)
      const soundInfo = await Expo.Audio.Sound
        .create({uri: filePath}, {shouldPlay: false})
      return soundInfo.sound;
    } catch (e) {
      console.log(e);
    }
  }

  @action
  fetchDiaryAudio = async () => {
    const filePath = Expo.FileSystem.documentDirectory + 'recording.mp3';
    try {
      const downloadUrl = await this.storage
        .ref(`/users_data/${AuthStore.user.uid}/session_${this.sessionNumber}/recording.mp3`)
        .getDownloadURL();
      this.diaryAudio = await this.downloadAudio(downloadUrl, filePath);
    } catch (e) {
      console.log(e);
    }
  }

  @action
  saveRecording = async (recordingUri) => {
    try {
      await firebase.storage()
        .ref(`users_data/${AuthStore.user.uid}/session_${this.sessionNumber}/recording.mp3`)
        .putFile(recordingUri);
    } catch (e) {
      console.log(e);
    }
  };

  readSessionInfoToStore = async (sectionName) => {
    await Expo.FileSystem
      .readAsStringAsync(Expo.FileSystem.documentDirectory + `${sectionName}_mother.txt`)
      .then(content => {
        if  (sectionName === 'exercise') {
          this.sessionExercise = content
        } else if (sectionName === 'reflection') {
          this.sessionReflection = content
        } else {
          this.sessionInfo = content
        }
      })
      .catch(e => console.log(e));
  };
}

export default new SessionStore();