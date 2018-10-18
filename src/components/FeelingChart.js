import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Button } from 'react-native';
import { VictoryAxis, VictoryChart } from 'victory-native';
import { Line, Svg } from 'react-native-svg';

export default class FeelingChart extends React.Component {
  renderLine = () => {
    const { data, padding, height, width, maxDomainX, maxDomainY } = this.props;
    const x0 = padding;
    const y0 = height - padding;
    const ratioX = (width - 2 * padding) / maxDomainX;
    const ratioY = (height - 2 * padding) / maxDomainY;
    const updatedData = data.map(point => ({
      x: point.x * ratioX + x0,
      y: y0 - point.y * ratioY
    }));
    return (
      <View style={{position: 'absolute'}}>
        <Svg height={height} width={width}>
          {updatedData.map(
            (point, key) => {
              if (key === updatedData.length - 1) return null;
              const x2 = updatedData[key + 1].x;
              const y2 = updatedData[key + 1].y;
              return (
                <Line
                  key={key}
                  x1={point.x}
                  y1={point.y}
                  x2={updatedData[key + 1].x}
                  y2={updatedData[key + 1].y}
                  stroke="red"
                  strokeWidth="2"
                />
              );
            }
          )}
        </Svg>
      </View>
    );
  };

  renderAxis = () => {
    const { height, width, maxDomainX, maxDomainY, padding } = this.props;

    return (
      <View>
        <Svg height={height} width={width}>
          <VictoryAxis crossAxis
            padding={padding}
            width={width}
            height={height}
            domain={[0, maxDomainX]}
            standalone={false}
            tickCount={maxDomainX}
          />
          <VictoryAxis dependentAxis crossAxis
            padding={padding}
            width={width}
            height={height}
            domain={[0, maxDomainY]}
            standalone={false}
            tickCount={maxDomainY / 2}
          />
        </Svg>
      </View>
    )
  }

  render() {
    const { data, maxDomainX, maxDomainY, height, width, padding } = this.props;
    const x0 = 32;
    const y0 = 200 - 32;
    const ratioX = (300 - 32 - 32) / 10;
    const ratioY = (200 - 32 - 32) / 10;
    const updatedData = data.map(point => ({ x: point.x * ratioX + x0, y: y0 - point.y * ratioY }));
    return (
      <View>
        {this.renderAxis()}  
        {this.renderLine()}
      </View>
    )
  }
}

FeelingChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  maxDomainX: PropTypes.number.isRequired,
  maxDomainY: PropTypes.number.isRequired
};
