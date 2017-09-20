import { addDays, differenceInDays } from 'date-fns';
import format from 'date-fns/format';
import th from 'date-fns/locale/th';

export const daysInAMonth = (startDate, endDate) => {
  const days = differenceInDays(endDate, startDate);
  const formattedDate = format(startDate, ['MMM-D-YY']); // eslint-disbale-line
  return [...Array(days + 1).keys()].map(i => addDays(formattedDate, i));
};

export const thDate = (date, formatString) =>
  format(date, formatString, {
    locale: th
  });
