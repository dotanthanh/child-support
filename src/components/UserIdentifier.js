import React from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import UserStore from '../stores/user';
import Loading from '../custom/Loading';

export class UserIdentifier extends React.Component {
  componentDidMount() {
    if (isEmpty(this.props.user.values)) {
      UserStore.fetchUserData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.user)) {
      this.redirect(nextProps.user.is_admin)
    }
  }

  redirect = (isAdmin) => {
    if (isAdmin) {
      this.props.navigation.navigate('Admin');
    } else {
      this.props.navigation.navigate('User')
    }
  }

  render() {
    const isLoading = isEmpty(this.props.user.values);
    
    return (
      <View style={styles.container}>
        <Loading animating={isLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  }
});

/*
  by passing Mobx store as props to component, we can use lifecycle methods
  based on the changes of Mobx store property
  */
const WrappedUserIndentifier = observer((props) => (
  <UserIdentifier {...props} user={UserStore.userdata} />
));

export default WrappedUserIndentifier;