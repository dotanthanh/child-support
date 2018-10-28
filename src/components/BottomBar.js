import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Tab = (props) => (
  <View style={styles.tab}>
    <Icon color="white" size={25} name={props.icon} />
    <Text style={styles.tabText}>{props.tabname}</Text>
  </View>
);

const BottomBar = (props) => (
  <View {...props} style={styles.container}>
    <Tab tabname="My Journey" icon="pregnant-woman" />
    <Tab tabname="Sessions" icon="library-books" />
    <Tab tabname="Q&A" icon="question-answer" />
    <Tab tabname="Groups" icon="group" />
    <Tab tabname="Chat" icon="sms" />
  </View>
);

const styles = StyleSheet.create({
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
  tabText: {
    fontSize: 10,
    color: 'white',
    fontWeight: "bold"
  }
});

export default BottomBar;
