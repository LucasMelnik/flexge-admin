import moment from 'moment';

export const getLabel = (week) => {
  const startYear = moment().startOf('year').add(Number(week), 'weeks');
  const startDate = startYear.startOf('week').format('MM/DD/YY');
  const endDate = startYear.endOf('week').format('MM/DD/YY');
  return `${startDate} - ${endDate}`;
};
