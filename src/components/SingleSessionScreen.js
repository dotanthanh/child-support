import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Button, Text, Icon } from 'react-native-elements';
import { isEmpty } from 'lodash';

import AppHeaderStack from '../custom/AppHeaderStack';
import BottomBar from './BottomBar';
import Loading from '../custom/Loading';
import SessionStore from '../stores/session';
import { container as containerStyles } from '../styles';
import { colors, text, shadow } from '../styles/theme';

@observer
class SingleSessionScreen extends React.Component {
  state = {
    audioPlaying: false,
    audioLoading: false,
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
    if (SessionStore.sessionAudio) {
      SessionStore.sessionAudio.setOnPlaybackStatusUpdate(this.audioStatusCallback);
    }
  }

  // download the audio and play it
  initializeSound = async () => {
    this.setState({ audioLoading: true, audioPlaying: false });
    try {
      await SessionStore.fetchSessionAudio();
      SessionStore.sessionAudio.setOnPlaybackStatusUpdate(this.audioStatusCallback);
      this.toggleSound();
    } catch (e) {
      console.log(e);
    }
  };

  // play/pause the audio
  toggleSound = () => {
    if (this.state.audioPlaying) {
      SessionStore.sessionAudio.pauseAsync();
    } else {
      SessionStore.sessionAudio.playAsync();
    }
  };

  // callback for changes in audio playing
  audioStatusCallback = (statusObject) => {
    console.log(statusObject)
    if (statusObject.didJustFinish) {
      SessionStore.sessionAudio.stopAsync();
    } else {
      this.setState({
        audioLoading: statusObject.isBuffering,
        audioPlaying: statusObject.isPlaying
      });
    }
  };

  toggleRecord = () => {
    this.setState({ recordOpened: !this.state.recordOpened })
  };

  componentWillUnmount() {
    // TODO: prevent memory leak here
    // stop the audio
    if (SessionStore.sessionAudio) {
      SessionStore.sessionAudio.stopAsync();
    }
  }

  render() {
    const { navigation: { state: { params } } } = this.props;
    const { audioLoading, audioPlaying, recordOpened } = this.state;
    const buttonListener = SessionStore.sessionAudio
      ? this.toggleSound
      : this.initializeSound; 
    
    return (
      <View style={styles.container}>
        <AppHeaderStack viewName={`Session ${params.sessionNumber}`} />
        <ScrollView style={styles.contentContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.headerStyle}>Info</Text>
                <Button
                  loading
                  loading={audioLoading}
                  loadingRight
                  rounded
                  disabled={audioLoading}
                  onPress={buttonListener}
                  buttonStyle={styles.iconButton}
                  title={audioLoading ? null : 'Play'}
                  iconRight={!audioLoading
                    ? {
                      name: audioPlaying ? 'pause' : 'play-arrow',
                      color: colors.white
                    } : undefined
                  }
                />
              </View>
            <Loading
              style={{paddingVertical: 16}}
              color={colors.main}
              animating={true}
              animating={isEmpty(SessionStore.sessionInfo)}
            />
            <Text style={styles.sessionInfo}>
              {/* {SessionStore.sessionInfo} */}
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
              {/* {SessionStore.sessionExercise} */}
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
                onPress={this.toggleRecord}
                buttonStyle={styles.recordButton}
                textStyle={{fontWeight: '500'}}
                title="Record"
              />
            )}
            {recordOpened && (
              <View>
                <Icon name='record' />
                <Button title="stop" />
                <Button title="cancel" />
                <Button title="upload" />
              </View>
            )}
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
  iconButton: {
    marginLeft: 12,
    minHeight: 32,
    padding: 0,
    backgroundColor: colors.main
  },
  recordButton: {
    marginVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.main,
    alignSelf: 'flex-start',
    ...shadow
  }
});

export default SingleSessionScreen;
