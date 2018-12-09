import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Button, Header, Icon, Divider } from 'react-native-elements';

import { formScreen, container as containerStyles, header as headerStyles } from '../styles';
import { colors, text, divider } from '../styles/theme';
import AppHeaderStack from '../custom/AppHeaderStack';

export class SettingScreen extends React.Component {
  state = {
    ...this.props.user
  }

  render() {
    const { closeForm, user } = this.props;

    const CancelButton = (
      <Button
        buttonStyle={styles.button}
        color={colors.black}
        containerViewStyle={styles.buttonContainer}
        textStyle={styles.buttonText}
        title="Cancel"
        onPress={closeForm}
      /> 
    );

    return (
      <View style={styles.container}>
        <AppHeaderStack viewName='SETTINGS' />

        <View style={styles.contentContainer}>

          <View style={styles.section}>
            <Text style={styles.sectionText}>Profile</Text>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Name</Text>
              <Icon name='chevron-right' />
            </View>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionText}>Privacy and security</Text>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Password</Text>
              <Icon name='chevron-right' />
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldText}>Account privacy</Text>
              <Icon name='chevron-right' />
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = {
  divider: {
    ...divider
  },
  container: {
    ...containerStyles.screenContainerMenu
  },
  header: {
    ...headerStyles.container
  },
  buttonContainer: {
    ...formScreen.buttonContainer
  },
  button: {
    ...formScreen.button
  },
  buttonText: {
    ...formScreen.button
  },
  buttonDisabled: {
    ...formScreen.buttonDisabled
  },
  contentContainer: {
    ...containerStyles.screenContent
  },
  section: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  sectionText: {
    fontWeight: text.boldWeight,
    fontSize: 16,
    paddingVertical: 8
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  fieldText: {
    fontSize: 16
  }
}

export default SettingScreen;
