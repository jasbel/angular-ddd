import { EWeekDay, TNumMonth, TWeekDay, TWeekDayES } from '../interfaces';

export const NumberToWeekly: { [key in TNumMonth]: TWeekDay } = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
  8: 'Monday',
  9: 'Tuesday',
  10: 'Wednesday',
  11: 'Thursday',
  12: 'Friday',
  13: 'Saturday',
  14: 'Sunday',
  15: 'Monday',
  16: 'Tuesday',
  17: 'Wednesday',
  18: 'Thursday',
  19: 'Friday',
  20: 'Saturday',
  21: 'Sunday',
  22: 'Monday',
  23: 'Tuesday',
  24: 'Wednesday',
  25: 'Thursday',
  26: 'Friday',
  27: 'Saturday',
  28: 'Sunday',
  29: 'Monday',
  30: 'Tuesday',
  31: 'Tuesday',
};

export const WeekdayList: TWeekDay[] = Object.keys(EWeekDay) as TWeekDay[]; // ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const WeekdayListEs: TWeekDayES[] = Object.values(EWeekDay) as TWeekDayES[]; // ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
