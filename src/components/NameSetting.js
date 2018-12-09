import React from 'react';
import { observer } from 'mobx-react';
import { View, StyleSheet, AlertIOS } from 'react-native';
import { Button, Icon, FormInput } from 'react-native-elements';

import { container as containerStyles } from '../styles';
import { colors, divider } from '../styles/theme';
import UserStore from '../stores/user';
import FormHeader from '../custom/FormHeader';

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

    return (
      <View style={styles.container}>
        <FormHeader
          rightButtonProps={{
            title: isSaving ? '' : 'Save',
            onPress: this.save,
            loading: isSaving,
            disabled: isChanged
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
          headerName='Name'
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
  contentContainer: {
    ...containerStyles.screenContent
  },
  input: {
    paddingTop: 12,
    paddingBottom: 12
  }
});

export default SettingScreen;
