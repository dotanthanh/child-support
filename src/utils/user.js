import moment from 'moment';

// only count from the last menstrual period (in miliseconds / weeks)
const PREGNANCY_MILISEC = 24192000 * 1000;

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
