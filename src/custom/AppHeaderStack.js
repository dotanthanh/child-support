import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

import { header as headerStyles } from '../styles';

export const AppHeaderStack = (props) => {
  const { viewName } = props;
  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={headerStyles.container}>
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
