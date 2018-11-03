import * as React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, text, shadow } from '../styles/theme';

const ProgressBar = (props) => {
  const { height, width, percentage, withPointer, pointerText, fontSize, ...rest } = props;
  const borderWidth = 1;
  const arrowSize = height * 2;
  const percentagePosition = percentage > 0 ? `${percentage}%` : 0;
  const textWidth = 84;
  const calculatedTextPosition = percentage * width / 100 - textWidth / 2; 
  let textPosition;
  if (calculatedTextPosition < 0) {
    textPosition = 0;
  }
  else  if (calculatedTextPosition > width - textWidth) {
    textPosition = width - textWidth;
  }
  else {
    textPosition = calculatedTextPosition;
  }
  const progress = {
    container: {
      height,
      width,
      borderWidth,
      borderRadius: height / 2,
      borderColor: colors.black,
      overflow: 'hidden',
      backgroundColor: colors.white
    },
    finished: {
      height: height - 2 * borderWidth,
      backgroundColor: colors.main,
      width: percentagePosition,
    }
  };
  const pointerStyle = {
    container: {
      width,
      alignItems: 'flex-start'
    },
    arrow: {
      width: arrowSize,
      marginVertical: arrowSize / -4,
      marginLeft: percentage * width / 100.0 - arrowSize / 2
    },
    text: {
      fontSize,
      paddingHorizontal: 8,
      paddingVertical: 4,
      height: fontSize * 2,
      color: colors.white,
      textAlign: 'center'
    },
    textContainer: {
      backgroundColor: colors.main,
      borderRadius: fontSize,
      width: 84,
      marginLeft: textPosition
    }
  };
  return (
    <View {...rest}>
      <View style={progress.container}>
        <View style={progress.finished} />
      </View>
      {withPointer && (
        <View style={pointerStyle.container}>
          <Icon
            size={arrowSize}
            iconStyle={pointerStyle.arrow}
            color={colors.black}
            name="arrow-drop-up"
          />
          <View style={pointerStyle.textContainer}>
            <Text style={pointerStyle.text}>{pointerText}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProgressBar;
