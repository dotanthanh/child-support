import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

const headerStyles = StyleSheet.create({
  centerComponent: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  } 
});

export const AppHeaderStack = (props) => {
  const { viewName } = props;
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View>
      <Header
        backgroundColor='#FA8D62'
        leftComponent={
          <Icon
            name='arrow-back'
            color='white'
            onPress={goBack}
          />
        }
        centerComponent={{
          text: viewName,
          style: headerStyles.centerComponent
        }}
      /> 
    </View>
  );
};

AppHeaderStack.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  }).isRequired,
  viewName: PropTypes.string
};

export default withNavigation(AppHeaderStack);
