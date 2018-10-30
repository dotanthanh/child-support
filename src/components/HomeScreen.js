import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text as HeaderText, Button } from 'react-native-elements';
import { observer } from 'mobx-react';

import FeelingChart from './FeelingChart';
import { withMenu } from './AppMenu';
import ProgressBar from '../custom/ProgressBar';
import BabyChart from './BabyChart';
import Loading from '../custom/Loading';
import UserStore from '../stores/user';
import { calculatePregTime } from '../utils/user';

@observer
class HomeScreen extends React.Component {
  state = {
    // switch between feeling chart and baby's activity chart
    feelingChartOpened: false
  };

  componentDidMount() {
    UserStore.fetchUserData();
    // calculateRemainingWeek(UserStore.data);
  }

  switchToFeelingChart = () => {
    this.setState({ feelingChartOpened: true });
  };

  switchToBabyChart = () => {
    this.setState({ feelingChartOpened: false });
  };

  goToCurrentSession = () => {
    this.props.navigation.navigate('Session');
  }

  render() {
    const { feelingChartOpened } = this.state;
    const timedata = calculatePregTime(UserStore.babydata.due_date);
    const feelingData = [
      {x: 29, y: 2},
      {x: 31, y: 5},
      {x: 32, y: 4},
      {x: 33, y: 3},
      {x: 34, y: 7},
      {x: 35, y: 7}
    ];
    const chartButtonStyle = {
      container: {
        flex: 1,
        marginLeft: 0,
        marginRight: 0
      },
      button: (isSelected, isFeelingChart) => ({
        height: 40,
        backgroundColor: isSelected ? '#FA8D62' : 'white',
        borderTopLeftRadius: isFeelingChart ? 0 : 20,
        borderBottomLeftRadius: isFeelingChart ? 0 : 20,
        borderTopRightRadius: isFeelingChart ? 20 : 0,
        borderBottomRightRadius: isFeelingChart ? 20 : 0,
      }),
      text: {
        fontSize: 12,
        fontWeight: 'bold' 
      }
    };

    return (
      <View style={styles.container}>
        <Loading
          style={styles.loading}
          size='large'
          color='#FA8D62'
          animating={!UserStore.userdata || !UserStore.babydata}
        />
        <View style={styles.progressContainer}>
          <View style={styles.weekInfo}>
            <HeaderText style={{fontWeight: '500', color: '#333333'}}>Week</HeaderText>
            <HeaderText h4 style={{fontWeight: 'bold', color: '#333333'}}>
              {timedata.currentWeek}
            </HeaderText>
          </View>
          <View>
            <HeaderText style={styles.welcomeText}>
              {timedata.daysRemaining} days to deliver !
            </HeaderText>
            <ProgressBar
              height={14}
              width={200}
              percentage={timedata.progress}
              withPointer
              pointerText="You are here!"
              fontSize={10}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Button
            onPress={this.goToCurrentSession}
            buttonStyle={styles.forwardButton}
            color='white'
            iconRight={{
              name: 'arrow-forward',
              color: 'white',
              size: 20
            }}
            title='Go to current session'
            textStyle={{ fontWeight: 'bold', fontSize: 14 }}
          />
          <View style={styles.chartCard}>
            {feelingChartOpened
              ? (
                <FeelingChart
                  data={feelingData}
                  height={180}
                  width={300}
                  padding={32}
                />
              ) : (
                <BabyChart width={300} height={180} padding={12} />
              )
            }
            <View style={styles.chartButtons}>
              <Button
                onPress={this.switchToBabyChart}
                containerViewStyle={chartButtonStyle.container}
                buttonStyle={chartButtonStyle.button(!feelingChartOpened, false)}
                title="Baby's activity"
                color={!feelingChartOpened ? 'white' : '#333333'}
                textStyle={chartButtonStyle.text}
              />
              <Button
                onPress={this.switchToFeelingChart}
                containerViewStyle={chartButtonStyle.container}
                buttonStyle={chartButtonStyle.button(feelingChartOpened, true)}
                title="Your feeling"
                color={feelingChartOpened ? 'white' : '#333333'}
                textStyle={chartButtonStyle.text}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const boxShadow = {
  shadowOffset: { height: 2, width: 0 },
  shadowColor: 'black',
  shadowOpacity: 0.4 
};

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
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
    paddingBottom: 36,
    justifyContent: 'space-between',
    minHeight: '60%' 
  },
  forwardButton: {
    height: 40,
    marginBottom: 12,
    backgroundColor: '#FA8D62',
    borderRadius: 20,
    ...boxShadow
  },
  chartCard: {
    height: '80%',
    padding: 12,
    borderRadius: 4,
    justifyContent: 'space-between',
    backgroundColor: '#E4FAF7',
    alignItems: 'center',
    ...boxShadow
  },
  chartButtons: {
    // height: 48,
    flexDirection: 'row',
    margin: 16,
    maxWidth: 240,
    ...boxShadow
  }
});

export default withMenu(HomeScreen, 'journey');
