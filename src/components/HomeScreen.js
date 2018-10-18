import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import FeelingChart from './FeelingChart';

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
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <FeelingChart
          data={feelingData}
          height={200}
          width={300}
          padding={32}
          maxDomainX={8}
          maxDomainY={10}
        />
      </View>
    );
  }
};

export default withHeader(HomeScreen);
