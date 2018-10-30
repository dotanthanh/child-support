import * as React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

/*
  wrapper component over react-native's ActivityIndicator
  all props inherited
*/
const Loading = (props) => {
  const {
    animating, color, size, hidesWhenStopped,
    style: viewStyles,
    ...viewProps
  } = props;

  return (
    <View style={animating ? viewStyles : {}} {...viewProps}>
      {animating &&
        <ActivityIndicator {...{animating, color, size, hidesWhenStopped}} />
      }
    </View>
  )
};

Loading.propTypes = {
  animating: PropTypes.bool.isRequired
}

export default Loading;
