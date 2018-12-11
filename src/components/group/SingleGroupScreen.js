import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  ScrollView,
  Image,
  Dimensions,
  AlertIOS
} from 'react-native';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import AppHeaderStack from '../../custom/AppHeaderStack';
import BottomBar from '../BottomBar';
import { container as containerStyles, subSection } from '../../styles';
import { colors, text, border } from '../../styles/theme';
import GroupStore from '../../stores/group';
import UserStore from '../../stores/user';
import Member from './Member';

@observer
export class SingleGroupScreen extends React.Component {

  joinGroup = async () => {
    const { navigation: { state: { params } } } = this.props;
    const groupId = params.groupId;
    const group = GroupStore.groups.find(group => group.id === groupId);

    try {
      await GroupStore.joinGroup(group);
      AlertIOS.alert('Joined');
    } catch (e) {
      AlertIOS.alert('Failed to join group');
    }
  }

  leaveGroup = async () => {
    const { navigation: { state: { params } } } = this.props;

    try {
      await GroupStore.leaveGroup(params.groupId);
      AlertIOS.alert('Leaved');
    } catch (e) {
      AlertIOS.alert('Failed to leave group');
    }
  }

	render() {
    const { navigation: { state: { params } } } = this.props;
    const groupId = params.groupId;
    const group = GroupStore.groups.find(group => group.id === groupId);
    const isJoined = UserStore.joinedGroups.filter(g => g.id === group.id).length > 0;

    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: isJoined ? colors.main : colors.white,
        borderWidth: isJoined ? 0 : border.width,
        borderColor: colors.black,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignSelf: 'flex-start'
      },
      text: {
        fontWeight: text.bolderWeight,
        fontSize: 16,
        color: isJoined ? colors.white : colors.black
      }
    });

    return (
      <View style={styles.container}>
        <AppHeaderStack viewName='Groups' />

        <ScrollView style={styles.contentContainer}>
          <View style={styles.buttonGroup}>
            <Button
              rounded
              icon={{
                name: isJoined ? 'cancel' : 'add',
                style: { color: isJoined ? colors.white : colors.black }
              }}
              textStyle={buttonStyles.text}
              buttonStyle={buttonStyles.button}
              title={isJoined ? 'Leave' : 'Join'}
              onPress={isJoined ? this.leaveGroup : this.joinGroup}
            />
          </View>

          <View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>{group.name}</Text>
            </View>
            <Text style={styles.content}>
              {group.text}
            </Text>
          </View>

          <View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Members</Text>
            </View>
            <View style={styles.memberContainer}>
              {group.members && group.members.map(member => (
                <Member member={member} key={member.id} />
              ))}
            </View>
          </View>
        </ScrollView>

        <BottomBar currentView='Groups' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...containerStyles.screenContainerMenu
  },
  contentContainer: {
    ...containerStyles.screenContent,
  },
  content: {
    padding: 16
  },
  buttonGroup: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  subHeader: {
    backgroundColor: colors.lightBlue,
    ...subSection.header
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: text.boldWeight
  },
  memberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default SingleGroupScreen;
