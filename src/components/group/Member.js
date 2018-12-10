import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  Image,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

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
};

Member.propTypes = {
  member: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
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

export default Member;
