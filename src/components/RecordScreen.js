import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Audio, Permissions } from 'expo';

import { container as containerStyles, header as headerStyles } from '../styles';
import { shadow, colors } from '../styles/theme';

export class RecordScreen extends React.Component {
  state = {
    loadedSound: undefined,
    recording: undefined,
    isRecording: false,
    playable: false
  };

  componentDidMount() {
    this.prepareRecording();
  }

  prepareRecording = async () => {
    const permissions = Permissions.AUDIO_RECORDING;
    const { status } = await Permissions.askAsync(permissions);
    if (status === 'granted') {
      const recording = new Audio.Recording();
      recording.setOnRecordingStatusUpdate(this.recordingEventHandler);  
      this.setState({ recording });
    }
  }

  recordingEventHandler = (status) => {
    console.log(status)
    if (!status.canRecord) {
      return
    }
    if (!status.isRecording) {
      if (!this.state.isRecording) {
        this.setState({ isRecording: true });
      }
    }
  };

  startRecording = async () => {
    const { recording } = this.state;
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      // You are now recording!
    } catch (error) {
      console.log(error)
      // An error occurred!
    }
  };

  stopRecording = async () => {
    const { recording } = this.state;
    try {
      await recording
      .stopAndUnloadAsync()
      .then(async () => {
        const { sound } = await recording.createNewLoadedSound();
        this.setState({ sound, playable: true, isRecording: false });
      })
    } catch (error) {
      console.log(error)
      // An error occurred!
    }
  }

  playRecording = () => {
    const { recording } = this.state;
  }

  render() {
    const { closeScreen } = this.props;
    const { recording, isRecording, playable } = this.state;
    
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
            buttonStyle={styles.containerButton}
            color={colors.black}
            textStyle={styles.containerButtonText}
            title="Save"
          />
        </View>
        <View style={styles.buttonsGroup}>
          <Button
            disabled={!playable && !isRecording}
            rounded
            buttonStyle={styles.buttonStyle}
            icon={{ name: 'play-arrow', size: 40, style: styles.iconStyle }}
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
            disabled={!playable && !isRecording}
            rounded
            buttonStyle={styles.buttonStyle}
            icon={{ name: 'cancel', size: 40, style: styles.iconStyle }}
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
  container: {
    ...containerStyles.screenContainerMenu,
    justifyContent: 'center'
  },
  buttonsGroup: {
    flexDirection: 'row'
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
