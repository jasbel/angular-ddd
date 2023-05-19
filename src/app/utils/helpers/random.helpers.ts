import { addDays, subDays } from 'date-fns';
import { v4 } from 'uuid';
import { sDateTime } from '../interfaces';
import { dateToDatetime } from './date.helpers';

export const randomId = () => {
  return v4();
};

export const randomBool = (): boolean => {
  return randomNumber(1) ? true : false;
};

export const randomEmail = () => {
  return Math.random().toString(36).substring(2, 11) + '@develoop.com';
};

export const randomString = (length: number) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const randomDatetime = (data?: { max?: number; noReverse?: boolean }): sDateTime => {
  const { max = 10000, noReverse = false } = data || {};
  const randomDiference = randomNumber(max);
  const reverse = noReverse || randomBool();

  const _date = reverse ? subDays(new Date(), randomDiference) : addDays(new Date(), randomDiference);

  return dateToDatetime(_date);
};

export const randomNumber = (limitOne: number, limitMax?: number) => {
  const min = limitMax ? limitOne : 0;
  const max = limitMax ? limitMax : limitOne;
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const randomItem = <T = string>(arr: T[]): T => {
  const length = arr.length;
  const randomN = randomNumber(length - 1);

  return arr[randomN];
};
