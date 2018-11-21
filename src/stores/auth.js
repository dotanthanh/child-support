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
    const { email, password, date, ...rest } = userdata;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        let babyId = ''
        const babyref = firebase.database().ref('babies/').push({
          activity: [],
          due_date: date
        });
        babyref.once('value', (snapshot) => {
          babyId = snapshot.key;
          const data = {
            ...rest,
            email,
            password,
            baby: `babies/${babyId}`
          };
          const userRef = firebase.database().ref().child(`users`);
          userRef.child(credentials.user.uid).set(data)
        })
      })
  };

  @action
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(credentials => {
        // TODO: do something with the credentials here
      });
  };

  @action
  logout = () => {
    firebase.auth().signOut();
  }
}

export default new AuthStore();
