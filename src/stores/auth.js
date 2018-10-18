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
  signup = (userdata) => {
    const { email, password } = userdata;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        this.createUser(userdata);
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

  @action
  createUser = (userdata) => {
    const { dueDate, ...rest } = userdata;
    if (this.user) {
      const babyref = firebase.database().ref('babies/').push({
        activity: [],
        due_date: dueDate
      });
      firebase.database().ref(`users/${this.user.uid}`).set(rest);
    }
  }
}

export default new AuthStore();
