import moment from 'moment';

export const getLabel = (week) => {
  const startYear = moment().isoWeek(Number(week));
  const startDate = startYear.startOf('isoWeeks').format('MM/DD/YY');
  const endDate = startYear.endOf('isoWeeks').format('MM/DD/YY');
  return `${startDate} - ${endDate}`;
};
