import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

import BottomBar from './BottomBar';

export const AppHeader = (props) => {
  return (
    <View>
      <Header
        backgroundColor='#FA8D62'
        leftComponent={<Icon name='menu' onPress={props.openDrawer} color='white' />}
        centerComponent={{ text: 'MENU', style: {color: 'white', fontWeight: 'bold', fontSize: 16} }}
        rightComponent={<Icon name='search' color='white' />}
      />
    </View>
  );
}

AppHeader.propTypes = {
  openDrawer: PropTypes.func.isRequired
};

// HOC to include appheader/appbar to a screen/component
export const withMenu = (WrappedComponent) => {
  return class extends React.Component {
    openDrawer = () => {
      this.props.navigation.openDrawer();
    }

    render() {
      return (
        <View style={styles.container}>
          <AppHeader openDrawer={this.openDrawer} />
          <WrappedComponent {...this.props} />
          <BottomBar />
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
