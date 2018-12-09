import React from 'react';
import { observer } from 'mobx-react';
import { View, StyleSheet, AlertIOS } from 'react-native';
import { Button, Icon, FormInput } from 'react-native-elements';

import { container as containerStyles } from '../styles';
import { colors, divider } from '../styles/theme';
import AuthStore from '../stores/auth';
import FormHeader from '../custom/FormHeader';

@observer
export class PasswordSetting extends React.Component {
  state = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    isSaving: false
  }

  getOnInputChange = (type) => {
    return (value) => {
      this.setState({ [type]: value });
    };
  }

  validatePasswordInput = () => {
    const { newPassword, newPasswordConfirm } = this.state;
    return newPassword === newPasswordConfirm;
  }

  save = async () => {
    const { newPassword, currentPassword } = this.state;

    this.setState({ isSaving: true });
    try {
      if (this.validatePasswordInput()) {
        await AuthStore.changePassword(currentPassword, newPassword);
        AlertIOS.alert('Saved');
      } else {
        AlertIOS.alert("You didn't re-enter the same password");
      }
    } catch (e) {
      AlertIOS.alert('Password change failed');
      console.log(e)
    }
    this.setState({ isSaving: false });
  }

  render() {
    const { isSaving, newPassword, newPasswordConfirm, currentPassword } = this.state;
    const goBack = () => {
      this.props.navigation.goBack();
    };
    const canSave = currentPassword !== ''
      && newPassword !== ''
      && newPasswordConfirm !== '';

    return (
      <View style={styles.container}>
        <FormHeader
          rightButtonProps={{
            title: isSaving ? '' : 'Save',
            onPress: this.save,
            loading: isSaving,
            disabled: !canSave
          }}
          headerProps={{
            leftComponent: (
              <Icon
                name='chevron-left'
                color={colors.black}
                onPress={goBack}
              />
            )
          }}
          headerName='Change password'
        />

        <View style={styles.contentContainer}>
          <FormInput
            secureTextEntry
            placeholder='Current password'
            onChangeText={this.getOnInputChange('currentPassword')}
            inputStyle={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
          />
          <FormInput
            secureTextEntry
            placeholder='New password'
            onChangeText={this.getOnInputChange('newPassword')}
            inputStyle={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
          />
          <FormInput
            secureTextEntry
            placeholder='Confirm new password'
            onChangeText={this.getOnInputChange('newPasswordConfirm')}
            inputStyle={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
          />
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
  input: {
    paddingTop: 12,
    paddingBottom: 12
  }
});

export default PasswordSetting;
