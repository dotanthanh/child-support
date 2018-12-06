import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { withAudioPlaying } from '../wrappers/audio';
import { colors } from '../styles/theme';

const SessionAudioPlayer = (props) => {
  const { audioLoading, audioPlaying, toggleSound, initializeSound, audio } = props;
  const buttonListener = audio ? toggleSound : initializeSound;

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

SessionAudioPlayer.propTypes = {
  audioLoading: PropTypes.bool.isRequired,
  audioPlaying: PropTypes.bool.isRequired,
  toggleSound: PropTypes.func.isRequired,
  initializeSound: PropTypes.func.isRequired
};

export default withAudioPlaying(SessionAudioPlayer);
