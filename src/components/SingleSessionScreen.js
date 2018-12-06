import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Button, Text, Icon } from 'react-native-elements';
import { isEmpty } from 'lodash';

import RecordScreen from './RecordScreen';
import AppHeaderStack from '../custom/AppHeaderStack';
import BottomBar from './BottomBar';
import Loading from '../custom/Loading';
import SessionStore from '../stores/session';
import { container as containerStyles } from '../styles';
import { colors, text, shadow } from '../styles/theme';
import AudioPlayer from './SessionAudioPlayer';
import { withAudioPlaying } from '../wrappers/audio';

@observer
class SingleSessionScreen extends React.Component {
  state = {
    recordOpened: false
  }

  componentDidMount() {
    const { navigation: { state: { params } } } = this.props;
    /*
      check if user changed session, reset SessionStore
      and re-fetch the information text 
    */
    if (SessionStore.sessionNumber !== params.sessionNumber) {
      SessionStore.changeSession(params.sessionNumber);
    }
    if (isEmpty(SessionStore.sessionInfo)) {
      SessionStore.fetchSessionText();
    }
  }

  toggleRecord = () => {
    this.setState({ recordOpened: !this.state.recordOpened })
  };

  render() {
    const { navigation: { state: { params } } } = this.props;
    const { recordOpened } = this.state;
    
    const SessionAudioPlayer = withAudioPlaying(
      AudioPlayer,
      SessionStore.sessionAudio,
      SessionStore.fetchSessionAudio
    );
    const DiaryAudioPlayer = withAudioPlaying(
      AudioPlayer,
      SessionStore.diaryAudio,
      SessionStore.fetchDiaryAudio
    );

    return recordOpened ? (
      <RecordScreen
        closeScreen={this.toggleRecord}
        saveRecording={SessionStore.saveRecording}
      />
    ) : (
      <View style={styles.container}>
        <AppHeaderStack viewName={`Session ${params.sessionNumber}`} />
        <ScrollView style={styles.contentContainer}>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.headerStyle}>Info</Text>
              <SessionAudioPlayer />
              </View>
            <Loading
              style={{paddingVertical: 16}}
              color={colors.main}
              animating={true}
              animating={isEmpty(SessionStore.sessionInfo)}
            />
            <Text style={styles.sessionInfo}>
              {SessionStore.sessionInfo}
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.headerStyle}>Exercise</Text>
            </View>
            <Loading
              style={{paddingVertical: 16}}
              color={colors.main}
              animating={true}
              animating={isEmpty(SessionStore.sessionExercise)}
            />
            <Text style={styles.sessionInfo}>
              {SessionStore.sessionExercise}
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.headerStyle}>Reflection</Text>
            </View>
            <Loading
              style={{paddingVertical: 16}}
              color={colors.main}
              animating={true}
              animating={isEmpty(SessionStore.sessionReflection)}
            />
            <Text style={styles.sessionInfo}>
              {SessionStore.sessionReflection}
            </Text>
            {!isEmpty(SessionStore.sessionReflection) && (
              <Button
                rounded
                icon={{ name: 'mic' }}
                onPress={this.toggleRecord}
                buttonStyle={styles.recordButton}
                textStyle={{fontWeight: '500'}}
                title="Record"
              />
            )}
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.headerStyle}>Diary</Text>
            </View>
            <Text style={styles.sessionInfo}>
              This is the archive of your diary in this section.
            </Text>
            <View style={styles.diaryRecording}>
              <Text>Diary recording</Text>
              <DiaryAudioPlayer />
            </View>
            <Loading
              style={{paddingVertical: 16}}
              color={colors.main}
              animating={true}
              animating={isEmpty(SessionStore.sessionExercise)}
            />
          </View>

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
  contentContainer: {
    width: '100%'
  },
  sectionContainer: {
    alignItems: 'center'
  },
  sessionInfo: {
    width: '100%',
    padding: 16,
    color: colors.black,
    fontSize: 14,
    lineHeight: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: text.boldWeight
  },
  recordButton: {
    marginVertical: 24,
    paddingHorizontal: 32,
    backgroundColor: colors.main,
    alignSelf: 'flex-start',
    ...shadow
  },
  diaryRecording: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 16
  }
});

export default SingleSessionScreen;
