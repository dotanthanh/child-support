import React from 'react';
import { 
	StyleSheet,
  View,
  AlertIOS
} from 'react-native';
import PropTypes from 'prop-types';
import { FormInput } from 'react-native-elements';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import { container as containerStyles } from '../styles';
import QuestionAnswerStore from '../stores/questionanswer';
import FormHeader from '../custom/FormHeader';

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

    return (
      <View style={styles.container}>

        <FormHeader
          leftButtonProps={{
            title: 'Cancel',
            onPress: closeForm
          }}
          rightButtonProps={{
            title: isSubmitting ? '' : 'Submit',
            onPress: this.submitQuestion,
            loading: isSubmitting,
            disabled: isEmpty(questionText)
          }}
          headerName='NEW QUESTION'
        />

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
  inputContainer: {
    borderBottomWidth: 0
  },
  input: {
    padding: 16,
    paddingTop: 16
  }
});

export default QuestionForm;
