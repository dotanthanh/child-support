import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

// single Tab component for BottomBar
const Tab = (props) => {
  const { isSelected, navigation, viewName } = props;
  const moveToScreen = () => {
    navigation.navigate(viewName);
  };
  const color = isSelected ? '#333333' : 'white';
  return (
    <TouchableWithoutFeedback onPress={moveToScreen}>
      <View style={styles.tab}>
        <Icon color={color} size={25} name={props.icon} />
        <Text style={styles.tabText(color)}>
          {props.tabname}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

Tab.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  viewName: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};

const NavigationTab = withNavigation(Tab); 

// BottomBar components
const BottomBar = (props) => {
  const { currentView } = props;
  return (
    <View {...props} style={styles.container}>
      <NavigationTab
        tabname='My Journey'
        icon='pregnant-woman'
        isSelected={currentView === 'Home'}
        viewName='Home'
      />
      <NavigationTab
        tabname='Sessions'
        icon='library-books'
        isSelected={currentView === 'Sessions'}
        viewName='Sessions'
      />
      <NavigationTab
        tabname='Q&A'
        icon='question-answer'
        isSelected={currentView === 'QuestionAnswer'}
        viewName='QuestionAnswer'
      />
      <NavigationTab
        tabname='Groups'
        icon='group'
        isSelected={currentView === 'Groups'}
        viewName='Groups'
      />
      <NavigationTab
        tabname='Chat'
        icon='sms'
        isSelected={currentView === 'Chat'}
        viewName='Chat'
      />
    </View>
  );
};

BottomBar.propTypes = {
  currentView: PropTypes.oneOf(
    ['Home', 'Sessions', 'QuestionAnswer', 'Groups', 'Chat']
  ).isRequired
};

const styles = {
  container: {
    backgroundColor: '#FA8D62',
    flexDirection: 'row',
    height: 48,
    width: '100%',
    bottom: 0
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  },
  tabText: (color) => ({
    fontSize: 10,
    color,
    fontWeight: "bold"
  })
};

export default BottomBar;
