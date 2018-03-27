import moment from 'moment';

export const getLabel = (week) => {
  const startYear = moment().isoWeek(Number(week));
  const startDate = startYear.startOf('isoWeeks').format('DD/MM/YY');
  const endDate = startYear.endOf('isoWeeks').format('DD/MM/YY');
  return `${startDate} - ${endDate}`;
};
