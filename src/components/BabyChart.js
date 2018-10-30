import * as React from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const BabyChart = (props) => {
  const { height, width, padding, ...rest } = props;
  const pieSize = (height - padding * 2);
  const styles = {
    pieWrapper: {
      height: pieSize,
      width: pieSize,
      borderRadius: pieSize / 2,
      shadowOffset: { height: 2, width: 0 },
      shadowColor: 'black',
      shadowOpacity: 0.4
    },
    infoBoard: {
      width: 'auto',
      maxHeight: '100%',
      padding: 16,
      borderRadius: 4,
      backgroundColor: 'white',
      alignSelf: 'center'
    },
    pieCategory: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 4
    },
    pieCategorySample: (color) => ({
      width: 16,
      height: 4,
      backgroundColor: color,
      marginRight: 8
    }),
    infoText: {
      fontSize: 10
    }
  }; 

  return (
    <View {...rest}>
      <View style={{height, width, flexDirection:'row', justifyContent: 'space-between', padding}}>
        <View style={styles.pieWrapper}>
          <VictoryPie
            padding={{top: 12, bottom: 12}}
            radius={pieSize / 2}
            height={pieSize}
            width={pieSize}
            colorScale={['tomato', 'orange', 'green']}
            data={[
              { x: null, y: 25 },
              { x: null, y: 10 },
              { x: null, y: 65 }
            ]}
          />
        </View>
        <View style={styles.infoBoard}>
          <View style={styles.pieCategory}>
            <View style={styles.pieCategorySample('tomato')} />
            <Text style={styles.infoText}>Sleeping</Text>
          </View>
          <View style={styles.pieCategory}>
            <View style={styles.pieCategorySample('orange')} />
            <Text style={styles.infoText}>Kicking</Text>
          </View>
          <View style={styles.pieCategory}>
            <View style={styles.pieCategorySample('green')} />
            <Text style={styles.infoText}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BabyChart;
