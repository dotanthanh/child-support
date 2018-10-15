import { observable, action } from 'mobx';
import firebase from 'react-native-firebase';

class AuthStore {
  @observable unsubscriber = firebase.auth().onAuthStateChanged(
    (user) => {
      this.user = user;
    }
  );
  @observable user = firebase.auth().currentUser;

  @action
  signup = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        // TODO: do something with the credentials here
      });
  };

  @action
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(credentials => {
        // TODO: do something with the credentials here
      });
  }

  @action
  logout = () => {
    firebase.auth().signOut();
  }
}

export default new AuthStore();
