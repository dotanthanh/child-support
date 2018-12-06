import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Audio, Permissions } from 'expo';

import { getTimeDurationString } from '../utils';
import { container as containerStyles, header as headerStyles } from '../styles';
import { shadow, colors } from '../styles/theme';

export class RecordScreen extends React.Component {
  state = {
    loadedSound: undefined,
    recording: undefined,
    isRecording: false,
    playable: false,
    recordingDuration: 0,
    soundPlaying: false,
    soundPlayingTime: 0
  };

  async componentDidMount() {
    this.prepareRecording();
  };

  prepareRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true
    });
    const permissions = Permissions.AUDIO_RECORDING;
    await Permissions.askAsync(permissions);
  };

  recordingEventHandler = (status) => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
    }
  };

  startRecording = async () => {
    try {
      const permissions = Permissions.AUDIO_RECORDING;
      const { status } = await Permissions.getAsync(permissions);

      if (status === 'granted') {
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        recording.setOnRecordingStatusUpdate(this.recordingEventHandler);
        this.setState({ recording });
        await recording.startAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };

  stopRecording = async () => {
    const { recording } = this.state;
    try {
      await recording.stopAndUnloadAsync();
      const { sound } = await recording.createNewLoadedSound();
      sound.setOnPlaybackStatusUpdate(this.loadedSoundStatusCallback);
      this.setState({ loadedSound: sound, playable: true, isRecording: false });
    } catch (error) {
      console.log(error)
      // An error occurred!
    }
  };

  // callback for changes in audio playing
  loadedSoundStatusCallback = (status) => {
    const { loadedSound } = this.state;    

    if (status.didJustFinish) {
      loadedSound.stopAsync();
      this.setState({ soundPlaying: false });
    } else {
      this.setState({
        soundPlayingTime: status.positionMillis,
        soundPlaying: status.isPlaying
      });
    }
  };

  playRecording = async () => {
    const { loadedSound } = this.state;
    if (loadedSound) {
      await loadedSound.playAsync();
    };
  }

  pauseRecording = async () => {
    const { loadedSound } = this.state;
    if (loadedSound) {
      await loadedSound.pauseAsync();
    }; 
  };

  resetRecording = async () => {
    const { loadedSound } = this.state;
    if (loadedSound) {
      await loadedSound.unloadAsync();
    }
    // reset to intial state of the component
    this.setState({
      loadedSound: undefined,
      recording: undefined,
      isRecording: false,
      playable: false,
      recordingDuration: 0,
      soundPlaying: false,
      soundPlayingTime: 0
    })
  }

  saveRecording = () => {
    // TODO
  };

  render() {
    const { closeScreen } = this.props;
    const {
      loadedSound, soundPlaying, soundPlayingTime,
      playable, recordingDuration, isRecording
    } = this.state;
    const displayedDuration = getTimeDurationString(recordingDuration);
    const displayedPlaybackTime = getTimeDurationString(soundPlayingTime);
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            buttonStyle={styles.containerButton}
            color={colors.black}
            textStyle={styles.containerButtonText}
            title="Cancel"
            onPress={closeScreen}
          />
          <Button
            disabled={!loadedSound}
            disabledStyle={styles.buttonDisabled}
            buttonStyle={styles.containerButton}
            color={colors.black}
            textStyle={styles.containerButtonText}
            title="Save"
            onPress={this.saveRecording}
          />
        </View>

        {/*
          display the timer for the recording, or the timer of the playback
          depend on which process is running
        */}
        <Text style={styles.timer}>
          {soundPlaying || soundPlayingTime > 0 ? displayedPlaybackTime : displayedDuration}
        </Text>

        <View style={styles.buttonsGroup}>
          <Button
            disabled={!playable || isRecording}
            rounded
            buttonStyle={styles.buttonStyle}
            icon={{
              name: soundPlaying ? 'pause' : 'play-arrow',
              size: 40,
              style: styles.iconStyle
            }}
            onPress={soundPlaying ? this.pauseRecording : this.playRecording}
          />
          <Button
            rounded
            buttonStyle={styles.buttonStyle}
            icon={{
              name: isRecording ? 'stop' : 'mic',
              size: 40,
              style: styles.iconStyle
            }}
            onPress={isRecording ? this.stopRecording : this.startRecording}
          />
          <Button
            disabled={!playable || isRecording}
            rounded
            buttonStyle={styles.buttonStyle}
            icon={{ name: 'cancel', size: 40, style: styles.iconStyle }}
            onPress={this.resetRecording}
          />
        </View>
      </View>
    );
  }
}

RecordScreen.propTypes = {
  closeScreen: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  header: {
    ...headerStyles.container,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  containerButton: {
    backgroundColor: 'transparent'
  },
  containerButtonText: {
    fontWeight: 'bold'
  },
  buttonDisabled: {
    backgroundColor: 'transparent',
    opacity: 0.5
  },
  container: {
    ...containerStyles.screenContainerMenu,
    justifyContent: 'center'
  },
  timer: {
    paddingVertical: 32,
    fontSize: 28,
    letterSpacing: 2
  },
  buttonsGroup: {
    flexDirection: 'row',
    paddingVertical: 32
  },
  buttonStyle: {
    ...shadow,
    backgroundColor: colors.main,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  iconStyle: {
    // current version of the library not center the icon
    marginRight: 0
  }
});

export default RecordScreen;
