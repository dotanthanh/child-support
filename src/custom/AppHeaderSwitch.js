import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

import { header as headerStyles } from '../styles';
import { colors } from '../styles/theme';

export const AppHeaderSwitch = (props) => {
  const {
    viewName,
    leftComponent,
    rightComponent,
    navigation: { openDrawer },
    ...rest
  } = props;
  
  return (
    <View style={headerStyles.container}>
      <Header
        {...rest}
        backgroundColor={colors.main}
        leftComponent={leftComponent ||
          <Icon name='menu' onPress={openDrawer} color='white' />
        }
        centerComponent={{
          text: viewName.toUpperCase(),
          style: headerStyles.centerComponent
        }}
        rightComponent={rightComponent ||
          <Icon name='search' color='white' />
        }
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
