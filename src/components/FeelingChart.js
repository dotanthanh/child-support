import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { VictoryAxis } from 'victory-native';
import { Svg, Polyline } from 'react-native-svg';
import { isEmpty } from 'lodash';

import { colors } from '../styles/theme';

export default class FeelingChart extends React.Component {
  renderLine = () => {
    const { data, padding, height, width } = this.props;
    const x0 = padding;
    const y0 = height - padding;
    const ratioX = (width - 2 * padding) / 7;
    const ratioY = (height - 2 * padding) / 10;
    // remove data entries that are out of covered range for the chart 
    const dataInRange = data.filter(point => point.day < data[0].day + 6);
    const updatedData =  dataInRange.map((point) => ({
        x: (point.day - dataInRange[0].day + 1) * ratioX + x0,
        y: y0 - point.feeling_rate * ratioY
      }));
    /*
      we need a string of formatted points 'x1,y1 x2,y1 x3,y3 ...'
      for polyline api
    */
    const polylinePoints = updatedData.reduce(
      (string, point, index) =>
        `${string} ${point.x},${point.y} `
      ,
      ''
    );

    return (
      <View style={{position: 'absolute'}}>
        <Svg height={height} width={width}>
          <Polyline
            points={polylinePoints}
            fill='none'
            stroke={colors.main}
            strokeWidth='5'
          />
        </Svg>
      </View>
    );
  };

  /*
    feeling chart will fix to 1->10 for Y axis, and limit to max 6 ticks on X axis
  */
  renderAxis = () => {
    const { data, height, width, padding, ...rest } = this.props;
    const axisStyle = {
      tickLabels: {
        fontSize: 12,
        color: colors.black
      },
      axis: {
        stroke: colors.black
      },
      axisLabel: {
        width: '100%',
        right: 0,
        position: 'absolute'
      }
    };
    const XLabelStyle = {
      position: 'absolute',
      right: 4,
      top: height - padding + 4,
      fontSize: 10
    };
    let tickValuesX = [];
    let firstDayTick = 0;
    if (!isEmpty(data)) {
      firstDayTick = data[0].day;
    }
    const lowerBound = firstDayTick > 0 ? firstDayTick : 1;
    for (var i = 0; i < 6; i++) {
      tickValuesX.push(firstDayTick + i);
    }

    return (
      <View {...rest}>
        <Svg height={height} width={width}>
          <VictoryAxis crossAxis
            padding={padding}
            width={width}
            height={height}
            domain={[lowerBound - 1, lowerBound + 6]}
            standalone={false}
            tickValues={tickValuesX}
            style={axisStyle}
          />
          <VictoryAxis dependentAxis crossAxis
            padding={padding}
            width={width}
            height={height}
            domain={[0, 10]}
            standalone={false}
            tickCount={5}
            style={axisStyle}
          />
        </Svg>
        <Text style={XLabelStyle}>Day</Text>
      </View>
    )
  }

  render() {
    const { padding, height, width, data } = this.props;
    const helperLineStyle = {
      height: 2,
      width: '25%',
      backgroundColor: colors.main,
      marginRight: 8
    };
    const helperStyle = {
      flexDirection: 'row',
      position: 'absolute',
      bottom: height - padding + 4,
      right: 4,
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <View style={{width, height}}>
        {this.renderAxis()}  
        {data.length > 1 && this.renderLine()}
        <View style={helperStyle}>
          <View style={helperLineStyle} />
          <Text style={{fontSize: 10}}>your feeling line</Text>
        </View>
      </View>
    )
  }
}

FeelingChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    week: PropTypes.number,
    feeling_rate: PropTypes.number
  })).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired
};
