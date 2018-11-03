import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

import BottomBar from '../components/BottomBar';
import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import AppHeaderStack from '../custom/AppHeaderStack';

// HOC to include appheader/appbar to a screen/component
export const withMenu = (
  WrappedComponent,
  viewName = 'Home',
  isSwitchHeader = true
) => {
  return class extends React.Component {
    openDrawer = () => {
      this.props.navigation.openDrawer();
    }

    goBack = () => {
      this.props.navigation.goBack();
    }

    render() {
      return (
        <View style={styles.container}>
          {isSwitchHeader && (
            <AppHeaderSwitch viewName={viewName} openDrawer={this.openDrawer} />
          )}
          <WrappedComponent {...this.props} />
          <BottomBar currentView={viewName} />
        </View>
      );
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
