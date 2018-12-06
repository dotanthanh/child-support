import React from 'react';
import PropTypes from 'prop-types';

/*
  provide a component with stateful control over a given sound source
  take:
    - wrapped component
    - source of audio attached to the component
    - a function to fetch the audio 
*/
export const withAudioPlaying = (
  WrappedComponent,
  audio,
  fetchAudio
) => {

  const ComponentWithAudio = class extends React.Component {
    state = {
      audioPlaying: false,
      audioLoading: false
    };
  
    componentDidMount() {
      if (audio) {
        audio.setOnPlaybackStatusUpdate(this.audioStatusCallback);
      }
    }
    
    // download the audio and play it
    initializeSound = async () => {
      this.setState({ audioLoading: true, audioPlaying: false });

      try {
        await fetchAudio();
        audio.setOnPlaybackStatusUpdate(this.audioStatusCallback);
        this.toggleSound();
      } catch (e) {
        console.log(e);
      }
    };

    // play/pause the audio
    toggleSound = () => {
      if (this.state.audioPlaying) {
        audio.pauseAsync();
      } else {
        audio.playAsync();
      }
    };

    // callback for changes in audio playing
    audioStatusCallback = (statusObject) => {
      if (statusObject.didJustFinish) {
        audio.stopAsync();
      } else {
        this.setState({
          audioLoading: statusObject.isBuffering,
          audioPlaying: statusObject.isPlaying
        });
      }
    };

    componentWillUnmount() {
      // TODO: prevent memory leak here
      // stop the audio
      if (audio) {
        audio.stopAsync();
        audio.setOnPlaybackStatusUpdate(null);
      }
    }

    render() {
      const { audioLoading, audioPlaying } = this.state;
      const audioProps = {
        audioLoading,
        audioPlaying,
        toggleSound: this.toggleSound,
        initializeSound: this.initializeSound,
        shouldFetch: !audio
      };

      return (
        <WrappedComponent
          {...this.props}
          {...audioProps}
        />
      );
    }
  };

  ComponentWithAudio.propTypes = {
    audio: PropTypes.object,
    fetchAudio: PropTypes.func
  }

  return ComponentWithAudio;
};
