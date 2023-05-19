import { EMeal, ERecursiveDate, EWeekDay, TMeal, TRecursiveDate, TWeekDay } from '../interfaces';

export const WeekDayList: TWeekDay[] = Object.keys(EWeekDay) as TWeekDay[];
export const WeekDayListES: EWeekDay[] = Object.values(EWeekDay) as EWeekDay[];

export const MealList: TMeal[] = Object.keys(EMeal) as TMeal[];

export const RecursiveDateList: TRecursiveDate[] = Object.keys(ERecursiveDate) as TRecursiveDate[];

export const ActiveToValue = { '1': '¼', '0': '½' };
export type TActiveToValue = '1' | '0';

export const initConfigHttp ={ clearNullable: true }
