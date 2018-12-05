import React, { Component } from 'react';
import {  View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput} from 'react-native-elements';
import PropTypes from 'prop-types';
import { colors, text, shadow } from '../styles/theme';


export default class QuestionComponent extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  constructor(){
    super()
    this.state = {
        viewSection :false,
        answer: ''
    }
}

renderBottomComponent(){
    if(this.state.viewSection) {
        return (
            <FormInput
            placeholder="Answer"
            autoCapitalize="none"
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
            autoCorrect={false}
          />
        )
    }
}

buttonPress= () => {
    this.setState({viewSection:true})
}

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
            return (
                <View key={index} style={styles.qa}>
                    <Text style={styles.itemtext}>Q: {item.text}</Text>
                    <Text style={styles.itemtext}>A: {item.answer}</Text>
                </View>
            )
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
    qa: {
      margin: 10
    },
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 10
    },
    itemtext: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 6,
    width: 'auto',
    borderColor: colors.line,
    borderRadius: 4
  }
});