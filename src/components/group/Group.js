import React from 'react';
import { 
	StyleSheet,
	Text,
	View,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { iconButton } from '../../styles';
import { colors } from '../../styles/theme';

const Group = (props) => {
  const { group, navigate  } = props;

  return (
    <TouchableOpacity onPress={navigate}>
      <View style={styles.group}>
        <Text style={styles.groupText}>{group.name}</Text>
        <Button
          containerViewStyle={{ marginRight: 0 }}
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

export default Group;
