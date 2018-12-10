import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import AppHeaderStack from '../../custom/AppHeaderStack';
import BottomBar from '../BottomBar';
import { container as containerStyles, iconButton, subSection } from '../../styles';
import { colors, text, border } from '../../styles/theme';

@observer
export class SingleGroupScreen extends React.Component {

	render() {
    const { navigation: { state: { params } } } = this.props;
    const group = params.group;

    return (
      <View style={styles.container}>
        <AppHeaderStack viewName='Groups' />

        <ScrollView style={styles.contentContainer}>
          <View style={styles.buttonGroup}>
            <Button
              rounded
              icon={{ name: 'add', style: { color: colors.black } }}
              textStyle={styles.buttonText}
              buttonStyle={styles.button}
              title='Join'
            />
          </View>

          <View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>{group.name}</Text>
            </View>
            <Text style={styles.content}>
              This is a community for people with the same fear of birth.
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

const Member = (props) => {
  const { member } = props;

  return (
    <View style={styles.member}>
      <Image
        style={styles.memberImage}
        source={{ uri: member.picture_url }}
      />
      <Text style={styles.memberName}>{member.name}</Text>
    </View>
  );
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
  button: {
    borderWidth: border.width,
    borderColor: colors.black,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start'
  },
  buttonText: {
    fontWeight: text.bolderWeight,
    fontSize: 16,
    color: colors.black
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
  },
  member: {
    alignItems: 'center',
    padding: 12,
    width: Dimensions.get('window').width / 4,
  },
  memberImage: {
    width: Dimensions.get('window').width / 4 - 12 * 2,
    height: Dimensions.get('window').width / 4 - 12 * 2,
    borderRadius: Dimensions.get('window').width / 8 - 12
  },
  memberName: {
    paddingTop: 8
  }
});

export default SingleGroupScreen;
