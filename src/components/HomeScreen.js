import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text as HeaderText, Icon, Button } from 'react-native-elements';

import FeelingChart from './FeelingChart';
import { withMenu } from './AppHeader';
import ProgressBar from '../custom/ProgressBar';

class HomeScreen extends React.Component {
  render() {
    const feelingData = [
      {x: 29, y: 2},
      {x: 31, y: 5},
      {x: 32, y: 4},
      {x: 33, y: 3},
      {x: 34, y: 7},
      {x: 35, y: 7}
    ];

    const chartButton = {
      flex: 1,
      margin: 0,
      backgroundColor: 'blue'
    };

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
        <View style={styles.content}>
          <Button
            buttonStyle={styles.forwardButton}
            color='white'
            title='Go to current session'
            icon={<Icon name='arrow-forward' color='white' />}
            titleStyle={{fontWeight: '700'}}
          />
          <View style={styles.chartCard}>
            <FeelingChart
              data={feelingData}
              height={200}
              width={300}
              padding={32}
            />
            <View style={styles.chartButtons}>
              <Button containerStyle={chartButton} title="Baby's activity" />
              <Button containerStyle= {chartButton} title="Your feeling" />
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const boxShadow = {
  shadowOffset: { height: 2,  },
  shadowColor: 'black',
  shadowOpacity: 0.4, 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  progressContainer: {
    padding: 24,
    height: '30%',
    flexDirection: 'row',
    backgroundColor: '#C4F0E5',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...boxShadow
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
    marginRight: 24
  },
  welcomeText: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 32,
    minWidth: '60%'
  },
  content: {
    width: '100%',
    flex: 1,
    padding: 24,
    justifyContent: 'space-between'
  },
  forwardButton: {
    height: 40,
    marginBottom: 12,
    backgroundColor: '#FA8D62',
    borderRadius: 20,
    ...boxShadow
  },
  chartCard: {
    borderRadius: 4,
    backgroundColor: '#E4FAF7',
    alignItems: 'center',
    ...boxShadow
  },
  chartButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 36,
    marginVertical: 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'white',
    ...boxShadow
  }
});

export default withMenu(HomeScreen);
