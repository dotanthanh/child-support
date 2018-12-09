import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, StyleSheet, AlertIOS, Switch } from 'react-native';
import { Icon } from 'react-native-elements';

import { container as containerStyles } from '../styles';
import { colors, divider } from '../styles/theme';
import UserStore from '../stores/user';
import FormHeader from '../custom/FormHeader';

@observer
export class PrivacySetting extends React.Component {
  state = {
    switchOn: !UserStore.userdata.profile_visible
  }

  onSwitch = async (value) => {
    this.setState({ switchOn: value });
    try {
      await UserStore.updateAccount({ profile_visible: !value });
    } catch (e) {
      AlertIOS.alert('Failed to change profile privacy');
      this.setState({ switchOn: !value });
    }
  }

  render() {
    const { switchOn } = this.state;

    const goBack = () => {
      this.props.navigation.goBack();
    };

    return (
      <View style={styles.container}>
        <FormHeader
          headerProps={{
            leftComponent: (
              <Icon
                name='chevron-left'
                color={colors.black}
                onPress={goBack}
              />
            )
          }}
          headerName='Account privacy'
        />

        <View style={styles.contentContainer}>
          <View style={styles.field}>
            <Text style={styles.fieldText}>Private profile</Text>
            <Switch
              value={switchOn}
              onValueChange={this.onSwitch}
            />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    ...divider
  },
  container: {
    ...containerStyles.screenContainerMenu
  },
  contentContainer: {
    ...containerStyles.screenContent
  },
  field: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fieldText: {
    fontSize: 16
  }
});

export default PrivacySetting;
