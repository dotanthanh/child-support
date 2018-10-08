import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Icon } from 'react-native-elements';

export const AppHeader = (props) => {
  return (
    <View>
      <Header
        leftComponent={<Icon name="menu" onPress={props.openDrawer} />}
        centerComponent={{ text: 'MENU' }}
        rightComponent={{ icon: 'search' }}
      />
    </View>
  );
}

AppHeader.propTypes = {
  openDrawer: PropTypes.func.isRequired
};

export const withHeader = (WrappedComponent) => {
  return class extends React.Component {
    openDrawer = () => {
      this.props.navigation.openDrawer();
    }

    render() {
      return (
        <View style={styles.container}>
          <AppHeader openDrawer={this.openDrawer} />
          <WrappedComponent {...this.props} />
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
