export const toUndefined = (str: string | null | undefined) => {
  if (str?.trim() === '') return undefined;
  if (str === 'null') return undefined;
  if (Object.is(str, null)) return undefined;
  if (Object.is(str, undefined)) return undefined;
  return str;
};

export const removeNullable = ({ ...obj }: any) => {
  if (!obj) return obj;

  Object.keys(obj).forEach((k) => (!obj[k] || obj[k] === 'null') && obj[k] !== undefined && delete obj[k]);
  return obj;
};

export const isValidCSVFile = (str: string) => {
  return !!(str?.toString() || '').endsWith('.csv');
};
export const isValidExcelFile = (str: string) => {
  return !!(str?.toString() || '').endsWith('.xls') || !!(str?.toString() || '').endsWith('.xlsx');
};

export const removeNullEmptyOrUndefined = ({ ...obj }: any) => {
  if (!obj) return obj;

  Object.keys(obj).forEach((k) => (obj[k] === '' || `${obj[k]}` === 'null' || obj[k] === 'null' || obj[k] === undefined) && delete obj[k]);
  return obj;
};

export const checkIfValidUUID = (str: string) => {
  // Regular expression to check if string is a valid UUID
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
};

export function removeDuplicates(arr: string[]) {
  return [...new Set(arr)];
}
