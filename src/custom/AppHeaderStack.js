import React from 'react';
import { View, Text } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

import { header as headerStyles } from '../styles';

export const AppHeaderStack = (props) => {
  const {
    viewName,
    navigation,
    ...rest
  } = props;

  const goBack = () => {
    navigation.dispatch(NavigationActions.back())
  };

  return (
    <View style={headerStyles.container}>
      <Header
        backgroundColor='#FA8D62'
        leftComponent={
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name='chevron-left'
              color='white'
              onPress={goBack}
            />
            <Icon
              containerStyle={{ marginHorizontal: 8 }}
              name='menu'
              onPress={navigation.openDrawer}
              color='white'
            />
          </View>
        }
        centerComponent={{
          text: viewName,
          style: headerStyles.centerComponent
        }}
        {...rest}
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
