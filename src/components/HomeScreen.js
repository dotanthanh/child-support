import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';

import { withHeader } from './AppHeader';

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
      <View>
        <View>
          <FeelingChart data={feelingData}/>
        </View>
      </View>
    );
  }
};

const FeelingChart = (props) => {
  return (
    <VictoryChart
      animate={{
        duration: 1000,
        onLoad: { duration: 1000 }
      }}
      theme={VictoryTheme.material}
      domain={{
        x: [1, 10],
        y: [1, 10]
      }}
      scale={{ x: 'linear', y: 'linear' }}
    >
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: 1, borderColor: 'black'}
        }}
        animate={{
          duration: 1000,
          onLoad: { duration: 1000 }
        }}
        data={props.data}
      />
    </VictoryChart>
  )
}

export default withHeader(HomeScreen);
