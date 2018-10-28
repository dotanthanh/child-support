import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const ProgressBar = (props) => {
  const { height, width, percentage, withPointer, pointerText, fontSize, ...rest } = props;
  const borderWidth = 1;
  const arrowSize = height * 2;
  const percentagePosition = `${percentage}${percentage > 0 ? '%' : ''}`;
  const progress = {
    container: {
      height,
      borderWidth,
      borderRadius: height / 2,
      borderColor: '#333333',
      overflow: 'hidden',
      backgroundColor: 'white'
    },
    finished: {
      height: height - 2 * borderWidth,
      backgroundColor: '#FA8D62',
      width: percentagePosition,
    }
  };
  const pointerStyle = {
    container: {
      alignItems: 'center',
      marginTop: arrowSize / -4,
    },
    arrow: {
      marginBottom: arrowSize / -4
    },
    text: {
      fontSize,
      paddingHorizontal: 8,
      paddingVertical: 4,
      height: fontSize * 2,
      color: 'white',
    },
    textContainer: {
      backgroundColor: '#FA8D62',
      borderRadius: fontSize
    }
  };

  return (
    <View {...rest}>
      <View style={progress.container}>
        <View style={progress.finished} />
      </View>
      {withPointer && (
        <View style={pointerStyle.container}>
          <Icon size={arrowSize} iconStyle={pointerStyle.arrow} name="arrow-drop-up" />
          <View style={pointerStyle.textContainer}>
            <Text style={pointerStyle.text}>{pointerText}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProgressBar;
