import React from 'react';
import { observer } from 'mobx-react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { ImagePicker, Permissions } from 'expo';

import AppHeaderSwitch from '../custom/AppHeaderSwitch'; 
import BottomBar from './BottomBar';
import UserStore from '../stores/user';
import Loading from '../custom/Loading';
import { container as containerStyles } from '../styles';
import { shadow, text, colors } from '../styles/theme';
import SettingScreen from './SettingScreen';

@observer
export class ProfileScreen extends React.Component {
  componentDidMount() {
    if (isEmpty(UserStore.userdata)) {
      UserStore.fetchUserData();
    }
  }

  chooseImage = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    if(status === 'granted') {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3]
        });
        UserStore.updateProfilePicture(result.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  takeImage = async () => {
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);
    if (status === 'granted') {
      try {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3]
        });
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
  };

  goToSetting = () => {
    this.props.navigation.navigate('Settings');
  }

  render() {
    const user = UserStore.userdata;
    const imageLoading = UserStore.updatingImage;
    const SettingsButton = (
      <Icon name='settings' color={colors.white} onPress={this.goToSetting} />
    );

    return (
      <View style={styles.container}>
        <AppHeaderSwitch
          viewName="Profile"
          rightComponent={SettingsButton}
        />
        <View style={styles.imageContainer}>
          {!imageLoading && (
            <Image
              style={styles.image}
              source={{ uri: UserStore.userdata.profile_image }}
            />
          )}
          <Loading style={styles.image} animating={imageLoading} />
          <Text style={styles.username}>{user.name}</Text>
          <View style={styles.buttonsGroup}>
            <Button
              rounded
              title='Update image'
              textStyle={styles.imageButtonText}
              icon={{ name: 'insert-photo' }}
              buttonStyle={styles.imageButton}
              onPress={this.chooseImage}
            />
            <Button
              rounded
              title='Take picture'
              textStyle={styles.imageButtonText}
              icon={{ name: 'camera-alt' }}
              buttonStyle={styles.imageButton}
              onPress={this.takeImage}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.infoTag}>Age</Text>
            <Text style={styles.infoText}>{user.age}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoTag}>Partner</Text>
            <Text style={styles.infoText}>
              {user.partner ? user.partner.name : 'None'}
            </Text>
          </View>
        </View>
        <BottomBar currentView="Profile" />
      </View>
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    ...shadow
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: Dimensions.get('window').width * 0.4 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  username: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 2,
    paddingVertical: 24
  },
  buttonsGroup: {
    flexDirection: 'row'
  },
  imageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.main,
    alignSelf: 'flex-start',
    ...shadow
  },
  imageButtonText: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  infoContainer: {
    minWidth: '80%',
  },
  infoSection: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  infoTag: {
    fontWeight: 'bold',
    fontSize: 16
  },
  infoText: {
    fontSize: 16
  }
})

export default ProfileScreen;
