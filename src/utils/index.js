import { keys } from 'lodash';

export const mapObjectToArrayWithId = (object) => {
  return keys(object).map(key => ({
    ...object[key],
    id: key
  }))
}

/*
  take number of miliseconds and convert to time duration of format mm:ss
  probably the maximum duration need to be converted will be less than an hour
*/
export const getTimeDurationString = (duration) => {
  const minutes = Math.floor(duration / 60 / 1000);
  const seconds = Math.floor((duration - minutes * 60 * 1000) / 1000);
  const minuteString = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const secondString = seconds > 9 ? `${seconds}` : `0${seconds}`;
  return `${minuteString}:${secondString}`;
}
