import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import QuestionComponent from './QAComponent';

import firebase from 'react-native-firebase';

let itemsRef = firebase.database().ref('user_questions/');

import { colors, text, shadow } from '../styles/theme';

export default class ListQuestions extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let questions = [];
            
            snapshot.forEach(item => {
              questions.push(item.val());
            });
            
            let items = Object.values(questions);
            this.setState({items});
         });
    }
    
    render() {
        return (
            <View style={styles.container}>
            <ScrollView>
                {
                    this.state.items.length > 0
                    ? <QuestionComponent items={this.state.items} />
                    : <Text>No items</Text>
                }
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.main,
      marginBottom: 10
    }
  })