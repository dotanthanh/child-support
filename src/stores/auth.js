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
  signup = async (userdata) => {
    const { email, password, due_date, ...rest } = userdata;
    
    try {
      const credentials = await firebase.auth().createUserWithEmailAndPassword(email, password)
      
      let babyId = ''
      const babyref = await firebase.database().ref('babies/').push({
        activity: [],
        due_date: due_date
      });
      await babyref.once('value', (snapshot) => {
        babyId = snapshot.key;
      });
      const data = {
        ...rest,
        email,
        is_admin: false,
        profile_visible: true,
        profile_image: 'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png',
        feelings_data: [],
        joined_groups: [],
        baby: `babies/${babyId}`
      };
      await firebase.database()
        .ref(`users/${credentials.user.uid}`)
        .set(data);
    } catch (e) {
      throw e;
    }
  };

  @action
  login = async (email, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(credentials => {
          // TODO: do something with the credentials here
        });
    } catch (e) {
      throw e;
    }
  };

  @action
  logout = () => {
    firebase.auth().signOut();
  }

  @action
  changePassword = async (currentPassword, newPassword) => {
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        this.user.email,
        currentPassword
      );
      await this.user.reauthenticateWithCredential(credential);
      await this.user.updatePassword(newPassword);
    } catch (e) {
      throw e;
    }
  }
}

export default new AuthStore();
