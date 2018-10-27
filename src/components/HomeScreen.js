import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Text as HeaderText } from 'react-native-elements';

import FeelingChart from './FeelingChart';
import BottomBar from './BottomBar';
import { withHeader } from './AppHeader';
import ProgressBar from '../custom/ProgressBar';

class HomeScreen extends React.Component {
  render() {
    const feelingData = [
      {x: 1, y: 2},
      {x: 2, y: 5},
      {x: 3, y: 4},
      {x: 4, y: 3},
      {x: 5, y: 7}
    ];

    return (
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.weekInfo}>
            <HeaderText style={{fontWeight: '500', color: '#333333'}}>Week</HeaderText>
            <HeaderText h4 style={{fontWeight: 'bold', color: '#333333'}}>23</HeaderText>
          </View>
          <View>
            <HeaderText style={styles.welcomeText}>XYZ days to deliver !</HeaderText>
            <ProgressBar
              height={14}
              width={100}
              percentage={5}
              withPointer
              pointerText="You are here!"
              fontSize={10}
            />
          </View>
        </View>
        <FeelingChart
          data={feelingData}
          height={200}
          width={300}
          padding={32}
          maxDomainX={8}
          maxDomainY={10}
        />
        <BottomBar />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  progressContainer: {
    height: '30%',
    flexDirection: 'row',
    backgroundColor: '#C4F0E5',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  weekInfo: {
    height: 84,
    width: 84,
    borderRadius: 42,
    padding: 12,
    borderWidth: 6,
    borderColor: '#FA8D62',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 36
  },
  welcomeText: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12
  }
});

export default withHeader(HomeScreen);
