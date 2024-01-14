import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import es from 'date-fns/locale/es';

const locales = {
  es: es,
};

export const localizer = dateFnsLocalizer({
  format,
  getDay,
  locales,
  parse,
  startOfWeek,
  bgColor: 'red',
  user: {
    _id: '1234566',
    name: 'Emmanuel Valentin',
  },
});
