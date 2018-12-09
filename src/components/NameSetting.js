import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, Switch, StyleSheet, AlertIOS } from 'react-native';
import { Button, Header, Icon, Divider, FormInput } from 'react-native-elements';

import { formScreen, container as containerStyles, header as headerStyles } from '../styles';
import { colors, text, divider } from '../styles/theme';
import AppHeaderStack from '../custom/AppHeaderStack';
import UserStore from '../stores/user';

@observer
export class SettingScreen extends React.Component {
  state = {
    name: UserStore.userdata.name,
    isSaving: false
  }

  onInputChange = (value) => {
    this.setState({ name: value });
  }

  save = async () => {
    this.setState({ isSaving: true });
    try {
      UserStore.updateAccount({ name: this.state.name });
      AlertIOS.alert('Saved');
    } catch (e) {
      AlertIOS.alert('Failed to save');
    }
    this.setState({ isSaving: false });
  }

  render() {
    const { name, isSaving } = this.state;

    const goBack = () => {
      this.props.navigation.goBack();
    };
    const isChanged = name !== UserStore.userdata.name;

    const SaveButton = (
      <Button
        loading
        loadingRight
        loading={isSaving}
        disabled={!isChanged}
        containerViewStyle={styles.buttonContainer}
        disabledStyle={styles.buttonDisabled}
        buttonStyle={styles.button}
        color={colors.black}
        textStyle={styles.buttonText}
        title={isSaving ? '' : 'Save'}
        onPress={this.save}
      /> 
    );

    return (
      <View style={styles.container}>
        <AppHeaderStack
          leftComponent={
            <Icon
              name='chevron-left'
              color={colors.black}
              onPress={goBack}
            />
          }
          rightComponent={SaveButton}
          centerComponent={{ text: 'Name', style: styles.headerText }}
          backgroundColor={colors.white}
        />

        <View style={styles.contentContainer}>

          <FormInput
            onChangeText={this.onInputChange}
            value={name}
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
  header: {
    ...headerStyles.container
  },
  headerText: {
    ...headerStyles.centerComponent,
    color: colors.black
  },
  buttonContainer: {
    ...formScreen.buttonContainer
  },
  button: {
    ...formScreen.button
  },
  buttonText: {
    ...formScreen.button,
    fontWeight: text.boldWeight
  },
  buttonDisabled: {
    ...formScreen.buttonDisabled
  },
  contentContainer: {
    ...containerStyles.screenContent
  },
  input: {
    paddingTop: 12,
    paddingBottom: 12
  }
});

export default SettingScreen;
