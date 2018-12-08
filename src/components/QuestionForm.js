import React from 'react';
import { 
	StyleSheet,
  View,
  Text,
  AlertIOS
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, FormInput, Header } from 'react-native-elements';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import { header as headerStyles, container as containerStyles } from '../styles';
import { colors, button, text } from '../styles/theme';
import QuestionAnswerStore from '../stores/questionanswer';

@observer
export class QuestionForm extends React.Component {
  state = {
    text: '',
    isSubmitting: false
  };

  onInputChange = (value) => {
    this.setState({ text: value });
  }

  submitQuestion = async () => {
    const { closeForm, topicId } = this.props;
    const { text } = this.state;

    this.setState({ isSubmitting: true });
    try {
      await QuestionAnswerStore.submitQuestion(text, topicId);
      AlertIOS.alert('Question submitted successfully');
    } catch (e) {
      AlertIOS.alert('Failed to submit question');
      this.setState({ isSubmitting: false });
    }
    closeForm();
  }

	render() {
    const { closeForm } = this.props;
    const { text: questionText, isSubmitting } = this.state;

    const CloseButton = (
      <Button
        buttonStyle={styles.button}
        color={colors.black}
        containerViewStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        title="Cancel"
        onPress={closeForm}
      /> 
    );
    const SubmitButton = (
      <Button
        loading
        loadingRight
        loading={isSubmitting}
        disabled={isEmpty(questionText)}
        containerViewStyle={styles.buttonContainer}
        disabledStyle={styles.buttonDisabled}
        buttonStyle={styles.button}
        color={colors.black}
        textStyle={styles.buttonText}
        title={isSubmitting ? '' : 'Submit'}
        onPress={this.submitQuestion}
      /> 
    )

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            backgroundColor={colors.white}
            leftComponent={CloseButton}
            centerComponent={
              <Text style={{ color: colors.black, fontWeight: text.bolderWeight }}>
                NEW QUESTION
              </Text>
            }
            rightComponent={SubmitButton}
          />
        </View>
        <FormInput
          placeholder='What do you want to ask ?'
          onChangeText={this.onInputChange}
          value={questionText}
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          autoCorrect={false}
          multiline
          autoCapitalize="sentences"
        />
      </View>
    );
  }
}

QuestionForm.propsTypes = {
  topicId: PropTypes.string,
  closeForm: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  header: {
    ...headerStyles.container
  },
  buttonContainer: {
    marginLeft: 0,
    marginRight: 0
  },
  button: {
    backgroundColor: 'transparent',
    padding: 0
  },
  buttonText: {
    fontWeight: text.bolderWeight
  },
  buttonDisabled: {
    backgroundColor: 'transparent',
    opacity: 0.5
  },
  inputContainer: {
    borderBottomWidth: 0
  },
  input: {
    padding: 16,
    paddingTop: 16
  }
});

export default QuestionForm;
