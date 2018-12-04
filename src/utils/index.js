import { keys } from 'lodash';

export const mapObjectToArrayWithId = (object) => {
  return keys(object).map(key => ({
    ...object[key],
    id: key
  }))
}