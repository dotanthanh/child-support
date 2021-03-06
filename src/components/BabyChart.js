import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { VictoryPie } from 'victory-native';
import { parseInt, isEmpty } from 'lodash';

import BabyStore from '../stores/baby';
import { colors, shadow } from '../styles/theme';

const BabyChart = (props) => {
  const { data, colors: propColors, height, width, padding, ...rest } = props;
  const pieSize = (height - padding * 2);
  const styles = {
    replacementText: {
      padding: 12
    },
    chartWrapper: {
      height,
      width,
      flexDirection:'row',
      justifyContent: 'space-between',
      padding,
      alignItems: 'center'
    },
    pieWrapper: {
      height: pieSize,
      width: pieSize,
      borderRadius: pieSize / 2,
      ...shadow
    },
    infoBoard: {
      width: 'auto',
      maxHeight: '100%',
      padding: 16,
      borderRadius: 4,
      backgroundColor: colors.white,
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
  // calculating the percentage of each section for the PieChart
  const babyData = BabyStore.activities_set.map((activity, index) => {
    const activitiesStat = data.filter(
      activityId => activityId === index
    ).length;
    const percentage = data.length > 0
      ? activitiesStat / data.length * 100
      : 0;
    return {
      x: `${parseInt(percentage)}%`,
      y: percentage
    };
  });

  return (
    <View {...rest}>
      <View style={styles.chartWrapper}>
        {isEmpty(data)
          ? <Text style={styles.replacementText}>
              There is no data yet
            </Text>
          : (
            <View style={styles.pieWrapper}>
              <VictoryPie
                padding={{top: 12, bottom: 12}}
                radius={pieSize / 2}
                height={pieSize}
                width={pieSize}
                labelRadius={pieSize / 4}
                style={{ labels: { fontSize: 10 } }}
                colorScale={propColors}
                data={babyData}
              />
            </View>
          )
        }
        <View style={styles.infoBoard}>
          {BabyStore.activities_set.map((activity, index) => (
            <View key={activity.name} style={styles.pieCategory}>
              <View style={styles.pieCategorySample(propColors[index])} />
              <Text style={styles.infoText}>{activity.name}</Text>
            </View> 
          ))}
        </View>
      </View>
    </View>
  );
};

export default observer(BabyChart);
