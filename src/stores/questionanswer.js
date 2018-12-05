import firebase from 'react-native-firebase';

export const addQuestion =  (item) => {
    firebase.database().ref('user_questions/').push({
    	answer: "",
    	is_answered: false,
        text: item
    });
}

export const addAnswer =  (item) => {
    
}