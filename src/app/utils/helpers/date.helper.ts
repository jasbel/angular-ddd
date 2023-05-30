import { format as formatFns } from 'date-fns';
import { sDate, sDateEs, sDateTime, sTime, sTimeSingle, TDatePeriod, TWeekDay } from '../interfaces';

export const isDate = (variable: unknown): boolean => {
  return variable instanceof Date && !isNaN(variable as unknown as number);
};

/**
 * new Date() => 2023-01-04 12:12
 */
export const dateToDatetime = (date: Date): sDateTime => {
  if (!date) return date;

  return formatFns(new Date(date), 'yyyy-MM-dd HH:mm:ss') as unknown as sDateTime;
};

export const isFormatDate = (date: Date | string): boolean => {
  const dateFormats = [
    { format: 'YYYY-MM-DD', regex: /^\d{4}-\d{2}-\d{2}$/ },
    { format: 'YYYY-MM-DD HH:MM', regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/ },
    { format: 'YYYY-MM-DD HH:MM:SS', regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/ },
  ];

  const dateObj = !!dateFormats.find(({ regex }) => regex.test(date.toString()));

  return dateObj;
};

/**
 * 2023-01-04 || 2023-01-04 12:12 => new Date()
 */
export const convertDateDBToDate = (dateString: sDate | string): Date | null => {
  const dateFormats = [
    { format: 'YYYY-MM-DD', regex: /^\d{4}-\d{2}-\d{2}$/ },
    { format: 'YYYY-MM-DD HH:MM', regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/ },
    { format: 'YYYY-MM-DD HH:MM:SS', regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/ },
  ];

  const dateObj = dateFormats.find(({ regex }) => regex.test(dateString.toString()));
  if (dateObj) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateString.toString().split(/[\/\-\s:]/);
    return new Date(`${year}-${Number(month) /* - 1 */}-${day} ${hour}:${minute}:${second}`);
  } else if (isDate(dateString)) {
    return dateString as sDate;
  } else {
    return null;
  }
};

/**
 *    => "pass" | "present" | "future"
 * */
export const dateToPeriod = (dateCompare: Date, date: Date = new Date()): TDatePeriod | null => {
  if (!dateCompare) return null;

  const date1Obj = new Date(dateCompare);
  const date2Obj = new Date(date);

  const date1Milis = date1Obj.getTime();
  const date2Milis = date2Obj.getTime();

  date1Obj.setHours(0, 0, 0, 0);
  date2Obj.setHours(0, 0, 0, 0);

  const date1Day = date1Obj.getTime();
  const date2Day = date2Obj.getTime();

  if (date1Day === date2Day) {
    return 'present';
  } else if (date1Milis >= date2Milis) {
    return 'future';
  } else if (date1Milis < date2Milis) {
    return 'pass';
  }

  return null;
};

/**
 *  15:28 => 15.30
 * */
export const formatTimeToNumber = (time: sTimeSingle): number => {
  const hour = Number(time.split(':')[0] || '0');
  const minute = Number(time.split(':')[1] || '0') / 60;

  return hour + minute;
};

export const isTimeInRange = (time: sTimeSingle, range: [sTimeSingle, sTimeSingle]): boolean => {
  const _item = formatTimeToNumber(time);
  const from = formatTimeToNumber(range[0]);
  const to = formatTimeToNumber(range[1]);

  return from <= _item && _item <= to;
};

/** 2023-01-04 15:28:45 => true */
export const regexDateTime = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;

/** 2023-01-04 15:28:45 | 2023-01-04 15:28 | 2023-01-04 => true */
export const regexDateDB = /^\d{4}-\d{2}-\d{2}(\s\d{2}:\d{2}(\:\d{2})?)?$/;

/**
 *  2023-01-04 15:28:45 or 2023-01-04 => 2023-01-04
 * */
export const formatDbToSDate = (_date: sDateTime | sDate): sDate => {
  if (!regexDateDB.test(_date.toString())) return _date;

  const [date, time] = _date.toString().split(' ');
  return date as unknown as sDate;
};

/**
 *  2023-01-04 15:28:45 => 15:28:45
 * */
export const formatDateEsToTime = (dateString: sDateTime): sTime => {
  if (!regexDateTime.test(dateString.toString())) return dateString as unknown as sTime;

  const [_date, time] = dateString.toString().split(' ');
  return (time || '00:00:00') as sTime;
};
/**
 *  2023-01-04 15:28:45 => 2023-01-04
 * */
export const formatDateEsToDate = (dateString: sDateTime): sDate => {
  if (!regexDateTime.test(dateString.toString())) return dateString;

  if (!dateString) return dateString;

  const [date, _time] = dateString.toString().split(' ');
  return date as unknown as sDate;
};

/**
 *  2023-01-04 => Date
 * */
export const formatSDateToDate = (_date: sDate): Date => {
  if (!_date) return _date;
  return new Date(`${_date} 00:00:00`);
};

/**
 *  2023-01-04 15:28:45 => 2023-01-04T15:28:45.000Z
 * */
export const formatDateEsToIso = (dateString: string): string => {
  const dateIso = dateString.replace(' ', 'T');
  if (dateIso.split(':').length > 1) return dateIso + '.000Z';

  return dateIso + '00.000Z';
};

/**
 *  2023-01-04 => boolean
 * */
const isValidDate = (dateString: string) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
};

/**
 *  2023-01-04 => 04/01/2023
 * */
export const formatDateToEs = (date: sDate): sDateEs | null => {
  if (!date) return date;
  if (!isValidDate(date.toString())) return date;

  const result = formatFns(new Date(`${date} 00:00:00`), 'dd/MM/yyyy') as unknown as sDateEs;
  return result;
};

/**
 *  2023-01-04 locale => 2023-01-04
 * */
export const formatDateToSDate = (date: Date): sDate => {
  if (!date) return date;

  const result = formatFns(new Date(date), 'yyyy-MM-dd') as unknown as sDate;

  return result;
};

/**
 * 2023-01-04T15:28:45.008Z => 2023-01-04 15:28:45
 * */
export const formatDateIsoToEs = (dateIso: string): string => {
  const [date, reduce] = dateIso.replace('T', ' ').split('.');

  return date;
};

export const getDifferenceTime = (date1: string, date2: string) => {
  const diffInMs = Date.parse(date2) - Date.parse(date1);
  if (diffInMs < 0) return `${date1}`;

  const diffInSecs = diffInMs / 1000;
  if (diffInSecs < 60) return `Hace ${diffInSecs.toFixed(0)} segundos`;

  const diffInMins = diffInSecs / 60;
  if (diffInMins < 60) return `Hace  ${diffInMins.toFixed(0)} minutos`;

  const diffInHours = diffInMins / 60;
  if (diffInHours < 24) return `Hace ${diffInHours.toFixed(0)} horas`;

  const diffInDays = diffInHours / 24;
  if (diffInDays < 30) return `Hace  ${diffInDays.toFixed(0)} dias`;

  return 'Hace meses';
};

/**
 * date => name week day
 * */

export const getWeekDayByDate = (date: Date): TWeekDay => {
  const _day = formatFns(date, 'EEEE') as TWeekDay;
  return _day;
};
