import React from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import UserStore from '../stores/user';
import Loading from '../custom/Loading';

export class UserIdentifier extends React.Component {
  componentDidMount() {
    if (isEmpty(this.props.user)) {
      UserStore.fetchUserData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      console.log(this.props.navigation)
      this.attemptRedirect()
    }
  }

  attemptRedirect = () => {
    const { user } = this.props;
    if (user.is_admin) {
      this.props.navigation.navigate('Admin');
    } else if (!isEmpty(user)) {
      this.props.navigation.navigate('User')
    }
  }

  render() {
    const isLoading = isEmpty(this.props.user)
    
    return (
      <Loading animating={isLoading} />
    );
  }
}

/*
  by passing Mobx store as props to component, we can use lifecycle methods
  based on the changes of Mobx store property
  */
const WrappedUserIndentifier = observer((props) => (
  <UserIdentifier {...props} user={UserStore.userdata} />
));

export default WrappedUserIndentifier;