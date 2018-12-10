import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  ScrollView
} from 'react-native';
import { observer } from 'mobx-react';

import AppHeaderSwitch from '../../custom/AppHeaderSwitch';
import BottomBar from '../BottomBar';
import { container as containerStyles, subSection } from '../../styles';
import { colors, text } from '../../styles/theme';
import GroupStore from '../../stores/group';
import UserStore from '../../stores/user';
import Group from './Group';

@observer
export class GroupScreen extends React.Component {
  componentDidMount() {
    GroupStore.fetchGroups();
  }

  getNavigate = (group) => {
    return () => {
      this.props.navigation.navigate('SingleGroup', { groupId: group.id });
    };
  }

	render() {
    const groups = GroupStore.groups;
    const userGroups = groups.filter(group => {
      return UserStore.joinedGroups.filter(g => g.id === group.id).length > 0;
    })

    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="Groups" />

        <ScrollView style={styles.contentContainer}>

          <View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Your groups</Text>
            </View>
            <View>
              {userGroups.map(group => (
                <Group
                  key={group.id}
                  group={group}
                  navigate={this.getNavigate(group)}
                />
              ))}
            </View>
          </View>

          <View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Common groups</Text>
            </View>
            <View>
              {groups.map(group => (
                <Group
                  key={group.id}
                  group={group}
                  navigate={this.getNavigate(group)}
                />
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
    ...containerStyles.screenContent
  },
  subHeader: {
    backgroundColor: colors.lightBlue,
    ...subSection.header
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: text.boldWeight
  }
});

export default GroupScreen;
