import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

import { header as headerStyles } from '../styles';

export const AppHeaderSwitch = (props) => {
  const { viewName, navigation: { openDrawer } } = props;
  return (
    <View style={headerStyles.container}>
      <Header
        backgroundColor='#FA8D62'
        leftComponent={
          <Icon name='menu' onPress={openDrawer} color='white' />
        }
        centerComponent={{
          text: viewName.toUpperCase(),
          style: headerStyles.centerComponent
        }}
        rightComponent={<Icon name='search' color='white' />}
      />
    </View>
  );
}

AppHeaderSwitch.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func
  }).isRequired,
  viewName: PropTypes.string
};

export default withNavigation(AppHeaderSwitch);
