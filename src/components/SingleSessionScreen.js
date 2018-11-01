import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import { isEmpty } from 'lodash';

import AppHeaderStack from '../custom/AppHeaderStack';
import BottomBar from './BottomBar';
import Loading from '../custom/Loading';
import SessionStore from '../stores/session';
import { container as containerStyles } from '../styles';
import { colors, text, shadow } from '../styles/theme';

@observer
class SingleSessionScreen extends React.Component {
  componentDidMount() {
    const { navigation: { state: { params } } } = this.props;
    if (isEmpty(SessionStore.sessionInfo)) {
      SessionStore.fetchSessionText(params.sessionNumber);
    }
  }

  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View style={styles.container}>
        <AppHeaderStack viewName={`Session ${params.sessionNumber}`} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Loading
            color={colors.main}
            animating={isEmpty(SessionStore.sessionInfo)}
          />
          <Text style={styles.sessionInfo}>
            {SessionStore.sessionInfo}
          </Text>
        </ScrollView>
        <BottomBar currentView='Sessions' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  sessionInfo: {
    padding: 16,
    color: colors.black,
    fontSize: 14,
    lineHeight: 20
  }
});

export default SingleSessionScreen;
