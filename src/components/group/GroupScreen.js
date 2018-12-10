import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import AppHeaderSwitch from '../../custom/AppHeaderSwitch';
import BottomBar from '../BottomBar';
import { container as containerStyles, iconButton, subSection } from '../../styles';
import { colors, button, text } from '../../styles/theme';
import GroupStore from '../../stores/group';

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

    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="Groups" />

        <ScrollView style={styles.contentContainer}>
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

const Group = (props) => {
  const { group, navigate  } = props;

  return (
    <TouchableOpacity onPress={navigate}>
      <View style={styles.group}>
        <Text style={styles.groupText}>{group.name}</Text>
        <Button
          containerViewStyle={{marginRight: 0}}
          iconRight={{
            name: 'chevron-right',
            size: 25,
            style: {color: colors.black}
          }}
          buttonStyle={styles.groupButton}
        />
      </View>
    </TouchableOpacity>
  );
}

Group.propTypes = {
  navigate: PropTypes.func,
  group: PropTypes.object
};

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
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: colors.line
  },
  groupText: {
    fontSize: 16
  },
  groupButton: {
    padding: 0,
    backgroundColor: 'transparent',
    ...iconButton
  }
});

export default GroupScreen;
