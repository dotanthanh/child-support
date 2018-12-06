import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { withAudioPlaying } from '../wrappers/audio';
import { colors } from '../styles/theme';

/*
  this component is meant to used with HOC/wrapper withAudioPlaying
  to get the following props:
    - audioLoading
    - audioPlaying
    - toggleSound
    - initializeSound
    - shouldFetch
*/
const SessionAudioPlayer = (props) => {
  const { audioLoading, audioPlaying, toggleSound, initializeSound, shouldFetch } = props;
  const buttonListener = shouldFetch ? initializeSound : toggleSound;

  return (
    <Button
      loading
      loading={audioLoading}
      loadingRight
      rounded
      disabled={audioLoading}
      onPress={buttonListener}
      buttonStyle={styles.button}
      title={audioLoading ? null : 'Play'}
      iconRight={!audioLoading
        ? {
          name: audioPlaying ? 'pause' : 'play-arrow',
          color: colors.white
        } : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 12,
    minHeight: 32,
    padding: 0,
    backgroundColor: colors.main
  }
});

SessionAudioPlayer.defaultProps = {
  audioLoading: false,
  audioPlaying: false
};

SessionAudioPlayer.propTypes = {
  audioLoading: PropTypes.bool,
  audioPlaying: PropTypes.bool,
  toggleSound: PropTypes.func,
  initializeSound: PropTypes.func,
  shouldFetch: PropTypes.bool
};

export default SessionAudioPlayer;
