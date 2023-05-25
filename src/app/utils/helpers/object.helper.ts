import { IModelSingle, IOption } from '../interfaces';

export const clearNullorEmpty = <T = unknown>({ ...obj }: T): T => {
  const _obj = obj as any;
  Object.keys(obj || {}).forEach(
    (k) => (_obj[k] === '' || _obj[k] === 'null') && _obj[k] !== undefined && delete _obj[k]
  );
  return _obj;
};

export const clearNullorEmptyorUndefined = <T = unknown>({ ...obj }: T): T => {
  if (!obj) return { ...obj };

  const _obj = obj as any;
  Object.keys(obj || {}).forEach(
    (k) => (_obj[k] === '' || _obj[k] === 'null' || _obj[k] === null || _obj[k] === undefined) && delete _obj[k]
  );
  return _obj;
};

export const removeNullEmptyOrUndefined = ({ ...obj }: any) => {
  if (!obj) return obj;

  Object.keys(obj).forEach(
    (k) => (obj[k] === '' || `${obj[k]}` === 'null' || obj[k] === 'null' || obj[k] === undefined) && delete obj[k]
  );
  return obj;
};

export const getHashToObject = <T>(obj: T, seed = 0) => {
  const str = JSON.stringify(obj);
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const filterDataObjectNoFalse = <T extends Object>(dataOrigin: T): T => {
  const _dataOrigin: any = dataOrigin;
  const _data = Object.keys(_dataOrigin).reduce((reData: any, key) => {
    if (typeof _dataOrigin[key] === 'object' && _dataOrigin[key] !== null) {
      const obj = filterDataObjectNoFalse(_dataOrigin[key]);
      if (Object.keys(obj).length > 0) {
        reData[key] = obj;
      }
    } else if (_dataOrigin[key]) {
      reData[key] = _dataOrigin[key];
    }
    return reData;
  }, {});

  return _data;
};

export const enumToModelList = <T, R>(enumObj: T, obj?: { [key in string]: string }): IModelSingle<keyof T>[] => {
  const _list = Object.entries(enumObj as any).map(([k, v]) => ({ id: k as unknown as keyof T, name: v as string }));
  return _list;
};

export const enumToOptionList = <T extends object>(enumObj: T): IOption<keyof T>[] => {
  const _list: IOption<keyof T>[] = Object.entries(enumObj).map(([k, v]) => ({
    value: k as keyof T,
    label: v as string,
  }));
  return _list;
};
