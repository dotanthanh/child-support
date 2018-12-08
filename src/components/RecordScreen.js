import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Header } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Audio, Permissions } from 'expo';

import { getTimeDurationString } from '../utils';
import {
  container as containerStyles,
  header as headerStyles,
  iconButton as iconStyle
} from '../styles';
import { shadow, colors, button, text } from '../styles/theme';

export class RecordScreen extends React.Component {
  state = {
    loadedSound: undefined,
    recording: undefined,
    isRecording: false,
    playable: false,
    recordingDuration: 0,
    soundPlaying: false,
    soundPlayingTime: 0,
    isSaving: false
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
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
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

  saveRecording = async () => {
    const { saveRecording, closeScreen } = this.props;
    const { loadedSound } = this.state;

    this.setState({ isSaving: true });
    try {
      const { uri } = await loadedSound.getStatusAsync();
      await saveRecording(uri);
      await loadedSound.unloadAsync();
      closeScreen();
    } catch (e) {
      this.setState({ isSaving: false });
    }
  };

  componentWillUnmount() {
    const { loadedSound } = this.state;
    if (loadedSound) {
      loadedSound.unloadAsync();
      loadedSound.setOnPlaybackStatusUpdate(null);
    }
  }

  render() {
    const { closeScreen } = this.props;
    const {
      loadedSound, soundPlaying, soundPlayingTime,
      playable, recordingDuration, isRecording, isSaving
    } = this.state;
    const displayedDuration = getTimeDurationString(recordingDuration);
    const displayedPlaybackTime = getTimeDurationString(soundPlayingTime);
    
    const CloseButton = (
      <Button
        containerViewStyle={styles.buttonContainer}
        buttonStyle={styles.containerButton}
        color={colors.black}
        textStyle={styles.containerButtonText}
        title="Cancel"
        onPress={closeScreen}
      />
    );
    const SaveButton = (
      <Button
        loading
        loadingRight
        loading={isSaving}
        disabled={!loadedSound}
        disabledStyle={styles.buttonDisabled}
        containerViewStyle={styles.buttonContainer}
        buttonStyle={styles.containerButton}
        color={colors.black}
        textStyle={styles.containerButtonText}
        title={isSaving ? 'Saving' : 'Save'}
        onPress={this.saveRecording}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            backgroundColor={colors.white}
            leftComponent={CloseButton}
            centerComponent={null}
            rightComponent={SaveButton}
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
  closeScreen: PropTypes.func.isRequired,
  saveRecording: PropTypes.func
};

const styles = StyleSheet.create({
  header: {
    ...headerStyles.container
  },
  buttonContainer: {
    marginLeft: 0,
    marginRight: 0
  },
  containerButton: {
    backgroundColor: 'transparent',
    padding: 0
  },
  containerButtonText: {
    fontWeight: text.bolderWeight
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
    ...button.default
  },
  iconStyle: {
    ...iconStyle
  }
});

export default RecordScreen;
