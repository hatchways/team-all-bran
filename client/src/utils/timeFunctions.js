import moment from 'moment'

export const getStandardTime = (time) => {
  const epochTime = time;
  const date = new Date(0);
  date.setUTCSeconds(epochTime);

  return {
    date: date.toDateString(),
    time: moment(date.toTimeString().split(' ')[0], 'HH:mm:ss').format('h:mm: A')
  }
}
