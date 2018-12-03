import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text as HeaderText, Button } from 'react-native-elements';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import FeelingChart from './FeelingChart';
import ProgressBar from '../custom/ProgressBar';
import BabyChart from './BabyChart';
import Loading from '../custom/Loading';
import UserStore from '../stores/user';
import BabyStore from '../stores/baby';
import { calculatePregTime } from '../utils/user';
import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import BottomBar from './BottomBar';
import { container as containerStyles } from '../styles';
import { shadow, text, colors } from '../styles/theme';

@observer
class QuestionAnswerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
};

const styles = StyleSheet.create({
});

export default QuestionAnswerScreen;
