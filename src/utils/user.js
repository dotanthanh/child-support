import { AsyncStorage } from 'react-native';
import moment from 'moment';
import { parseInt } from 'lodash';

import { PREGNANCY_MILISEC } from '../contants';

/*
  calculate time information of the pregnancy
  function arguments: 
    - timestamp: timestamp of the due date
*/
export const calculatePregTime = (timestamp) => {
  // round down the timestamps to the same anchor hour of the day (12 am)
  const dueDate = moment(timestamp).startOf('day');
  const now = moment().startOf('day');
  const lastMenstrual = moment(dueDate.valueOf() - PREGNANCY_MILISEC).startOf('day');
  const progress = (now.valueOf() - lastMenstrual.valueOf()) / PREGNANCY_MILISEC * 100.0;
  const daysRemaining = dueDate.diff(now, 'days');
  const currentWeek = now.diff(lastMenstrual, 'weeks');
  return {
    currentWeek,
    daysRemaining,
    progress
  };
};

/*
  take one argument of the timestamp of the pregnancy's duedate
  and return how many days have passed
*/
export const calculateCurrentDay = (timestamp) => {
  // round down the timestamps to the same anchor hour of the day (12 am)
  const dueDate = moment(timestamp).startOf('day');
  const now = moment().startOf('day');
  const lastMenstrual = moment(dueDate.valueOf() - PREGNANCY_MILISEC).startOf('day');
  return now.diff(lastMenstrual, 'days');
};

/*
  take duedate as timestamp and calculate the supposed current week/session
*/
export const calculateCurrentSession = (timestamp) => {
  const dayPassed = calculateCurrentDay(timestamp);
  return parseInt(dayPassed / 7) + 1;
};

export const cacheQuestion = async () => {
  await AsyncStorage.setItem(
    'questionLastEncounter',
    moment(Date.now()).startOf('day').valueOf().toString()
  )
};

export const shouldShowQuestion = async () => {
  const lastQuestionEncounter = await AsyncStorage
    .getItem('questionLastEncounter');
  if (lastQuestionEncounter) {
    const today = moment().startOf('day');
    const lastDay = moment(parseInt(lastQuestionEncounter));
    const dayPassed = today.diff(lastDay, 'days');
    return dayPassed > 0;
  }
  return true;
};
