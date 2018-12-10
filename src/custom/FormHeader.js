import React from 'react';
import { 
	StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, Header } from 'react-native-elements';

import { header as headerStyles, container as containerStyles, formScreen } from '../styles';
import { colors, text } from '../styles/theme';

export const FormHeader = (props) => {
  const {
    leftButtonProps,
    rightButtonProps,
    headerName,
    headerProps
  } = props;

  const LeftButton = (
    <Button
      buttonStyle={styles.button}
      color={colors.black}
      containerViewStyle={styles.buttonContainer}
      textStyle={styles.buttonText}
      {...leftButtonProps}
    /> 
  );
  const RightButton = (
    <Button
      loadingRight
      containerViewStyle={styles.buttonContainer}
      disabledStyle={styles.buttonDisabled}
      buttonStyle={styles.button}
      color={colors.black}
      textStyle={styles.buttonText}
      {...rightButtonProps}
    /> 
  )

  return (
    <View style={styles.header}>
      <Header
        backgroundColor={colors.white}
        leftComponent={LeftButton}
        centerComponent={
          <Text style={{ color: colors.black, fontWeight: text.bolderWeight }}>
            {headerName}
          </Text>
        }
        rightComponent={RightButton}
        {...headerProps}
      />
    </View>
  );
};

FormHeader.propsTypes = {
  leftButtonProps: PropTypes.object,
  rightButtonProps: PropTypes.object,
  headerName: PropTypes.string,
  headerProps: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  header: {
    ...headerStyles.container
  },
  buttonContainer: {
    ...formScreen.buttonContainer
  },
  button: {
    ...formScreen.button
  },
  buttonText: {
    ...formScreen.button
  },
  buttonDisabled: {
    ...formScreen.buttonDisabled
  }
});

export default FormHeader;
