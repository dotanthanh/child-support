import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text as HeaderText, Button } from 'react-native-elements';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import FeelingChart from './FeelingChart';
import ProgressBar from '../custom/ProgressBar';
import BabyChart from './BabyChart';
import Loading from '../custom/Loading';
import UserStore from '../stores/user';
import BabyStore from '../stores/baby';
import { calculatePregTime } from '../utils/user';
import AppHeaderSwitch from '../custom/AppHeaderSwitch';
import BottomBar from './BottomBar';
import { container as containerStyles } from '../styles';
import { shadow, text, colors } from '../styles/theme';

@observer
class HomeScreen extends React.Component {
  state = {
    // switch between feeling chart and baby's activity chart
    feelingChartOpened: true
  };

  componentDidMount() {
    UserStore.fetchUserData();
    if (isEmpty(BabyStore.activities_set)) {
      BabyStore.fetchActivitySet();
    }
  }

  switchToFeelingChart = () => {
    this.setState({ feelingChartOpened: true });
  };

  switchToBabyChart = () => {
    this.setState({ feelingChartOpened: false });
  };

  goToCurrentSession = () => {
    const sessionNumber = UserStore.userdata.current_session;
    this.props.navigation.navigate('SingleSession', { sessionNumber });
  }

  render() {
    const { feelingChartOpened } = this.state;
    const timedata = calculatePregTime(UserStore.babydata.due_date);
    const isWaiting = isEmpty(UserStore.userdata) || isEmpty(UserStore.babydata);
    const chartButtonStyle = {
      container: {
        flex: 1,
        marginLeft: 0,
        marginRight: 0
      },
      button: (isSelected, isFeelingChart) => ({
        height: 40,
        backgroundColor: isSelected ? colors.main : colors.white,
        borderTopLeftRadius: isFeelingChart ? 0 : 20,
        borderBottomLeftRadius: isFeelingChart ? 0 : 20,
        borderTopRightRadius: isFeelingChart ? 20 : 0,
        borderBottomRightRadius: isFeelingChart ? 20 : 0,
      }),
      text: {
        fontSize: 12,
        fontWeight: text.bolderWeight
      }
    };

    return (
      <View style={styles.container}>
        <AppHeaderSwitch viewName="HOME" />
        <Loading
          style={styles.loading}
          size='large'
          color={colors.main}
          animating={isWaiting}
        />
        <View style={styles.progressContainer}>
          <View style={styles.weekInfo}>
            <HeaderText style={{fontWeight: text.boldWeight, color: colors.black}}>
              Week
            </HeaderText>
            <HeaderText h4 style={{fontWeight: text.bolderWeight, color: colors.black}}>
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
            rounded
            onPress={this.goToCurrentSession}
            buttonStyle={styles.forwardButton}
            color='white'
            iconRight={{
              name: 'arrow-forward',
              color: text.white,
              size: 20
            }}
            title='Go to current session'
            textStyle={{ fontWeight: text.bolderWeight, fontSize: 14 }}
          />
          <View style={styles.chartCard}>
            {feelingChartOpened
              ? (
                <FeelingChart
                  data={UserStore.feelings_data.slice(-6)}
                  height={180}
                  width={300}
                  padding={32}
                />
              ) : (
                <BabyChart
                  data={UserStore.babydata.activities}
                  colors={['tomato', 'orange', 'green', 'pink']}
                  width={300}
                  height={180}
                  padding={12}
                />
              )
            }
            <View style={styles.chartButtons}>
              <Button
                onPress={this.switchToBabyChart}
                containerViewStyle={chartButtonStyle.container}
                buttonStyle={chartButtonStyle.button(!feelingChartOpened, false)}
                title="Baby's activity"
                color={!feelingChartOpened ? colors.white : colors.black}
                textStyle={chartButtonStyle.text}
              />
              <Button
                onPress={this.switchToFeelingChart}
                containerViewStyle={chartButtonStyle.container}
                buttonStyle={chartButtonStyle.button(feelingChartOpened, true)}
                title="Your feeling"
                color={feelingChartOpened ? colors.white : colors.black}
                textStyle={chartButtonStyle.text}
              />
            </View>
          </View>
        </View>
        <BottomBar currentView="Home" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  container: {
    ...containerStyles.screenContainerMenu
  },
  progressContainer: {
    padding: 24,
    flexDirection: 'row',
    backgroundColor: colors.blue,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow
  },
  weekInfo: {
    height: 84,
    width: 84,
    borderRadius: 42,
    padding: 12,
    borderWidth: 6,
    borderColor: colors.main,
    alignItems: 'center',
    backgroundColor: colors.white,
    marginRight: 24,
    ...shadow
  },
  welcomeText: {
    color: colors.black,
    fontWeight: text.bolderWeight,
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
    marginBottom: 12,
    backgroundColor: colors.main,
    ...shadow
  },
  chartCard: {
    height: '80%',
    padding: 12,
    borderRadius: 4,
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    ...shadow
  },
  chartButtons: {
    height: 48,
    flexDirection: 'row',
    margin: 16,
    maxWidth: 240,
    ...shadow
  }
});

export default HomeScreen;
