import { notyStatus } from '../constant';
import { MsgError } from '../constant/error-generic.constant';
import { ApiResponseModel, IErrorObject, StatusCode, TErrorMsg } from '../interfaces';

export const getNotifyString = <T = unknown>(
  _dataError: Pick<ApiResponseModel<any>, 'statuscode' | 'data'>,
  model?: { [key in keyof Partial<T>]: string }
): string => {
  if (!_dataError) return `Error: ${_dataError}`;
  const { statuscode, data } = _dataError;

  if (!statuscode || !data) return `Posiblemente (error): ${JSON.stringify(_dataError)}`;
  if (!getIsStatusError(statuscode)) return `Desconocido: ${_dataError}`;

  const dataErrorWithMsgEs = getMsgToEs(Object.prototype.toString.call(data) === '[object Array]' ? data[0] : data);
  const dataError = (getIsStatusError(statuscode) ? getDataErrorToFormatDataError(dataErrorWithMsgEs) : []) as IErrorObjectK<T>[];
  const dataErrorEs = getErrorNotyListToEs(dataError, model as { [key in TKey<Partial<T>>]: string });
  const dataGenerate = generateMessages(dataErrorEs);

  const errorTitle = notyStatus[statuscode];

  return `
    <strong>${errorTitle}</strong>
    <ul>${dataGenerate.join('')}</ul>
    `;
};

/* Complement  */
/** @example{"[bankAccounts][1][accountNumber]": ["IS_BLANK_ERROR"]} */
type TDataModelError<T = string> = { [key: string]: (keyof T)[] };
type TKey<T> = keyof Partial<T>;
type IErrorObjectK<T> = IErrorObject<TKey<T>>;

/**
 * @param data  [
    { field: "address",                                     msg: ["IS_BLANK_ERROR", "IS_NOT_FOUND"] },
    { section: "bankAccounts", row: "1", field: "accountNumber", msg: ["IS_BLANK_ERROR"]}
  ]
 * @param model  { address: "ADDRESS", contact: "CONTACT", bankAccounts: "BANKACCOUNTS" };
 * @returns  [
    { field: "ADDRESS",                                     msg: ["IS_BLANK_ERROR", "IS_NOT_FOUND"] },
    { section: "BANKACCOUNTS", row: "1", field: "accountNumber", msg: ["IS_BLANK_ERROR"]}
  ]
 */
const getErrorNotyListToEs = <T = unknown>(data: IErrorObjectK<T>[], model?: { [key in TKey<Partial<T>>]: string }): IErrorObjectK<T>[] => {
  if (!model) return data;

  const dateEs: IErrorObjectK<T>[] = data.map((obj) => {
    const translatedObj = obj;
    for (const [key, value] of Object.entries(obj) as unknown as [key: keyof IErrorObjectK<T>, value: TKey<T>][]) {
      (translatedObj[key] as unknown) = model[value as TKey<T>] || value;
    }
    return translatedObj;
  });

  return dateEs;
};

/**
 * @param data  {
    "[address]":                        ["IS_BLANK_ERROR", "IS_NOT_FOUND"  ],
    "[bankAccounts][1][accountNumber]": ["IS_BLANK_ERROR" ]
  }
 * @returns  [
    { field: "address",                                     msg: ["IS_BLANK_ERROR", "IS_NOT_FOUND"] },
    { section: "bankAccounts", row: "1", field: "accountNumber", msg: ["IS_BLANK_ERROR"]}
  ]
 */
const getDataErrorToFormatDataError = <T = unknown>(dataModelError: TDataModelError<T>): Partial<IErrorObjectK<T>>[] => {
  if (!dataModelError) return [];

  const output = [] as Partial<IErrorObjectK<T>>[];
  for (const key in dataModelError) {
    const value = dataModelError[key];
    const path = key.replace('[', '').replace(']', '');
    const sections = path.split(/\]\[|\[|\]/).filter(Boolean);

    if (sections.length === 1) {
      output.push({
        field: sections[0] as keyof T,
        msg: value,
      });
    } else if (sections.length === 2) {
      output.push({
        section: sections[0] as keyof T,
        field: sections[1] as keyof T,
        msg: value,
      });
    } else if (sections.length === 3) {
      output.push({
        section: sections[0] as keyof T,
        row: sections[1] as keyof T,
        field: sections[2] as keyof T,
        msg: value,
      });
    }
  }

  return output;
};

const generateMessages = (output: any): string[] => {
  const template1 = 'El campo <b>${field}</b> : <em>${msg}</em>';
  const template2 = 'En la seccion <b>${section}</b>, el campo <b>${field}</b> : <em>${msg}</em>';
  const template3 = 'En la seccion <b>${section}</b> fila <b><em>${row}</em></b>, el campo <b>${field}</b> : <em>${msg}</em>';

  const messages = [];
  for (const item of output) {
    if (item.section && item.row && item.field) {
      const msg = template3
        .replace('${section}', item.section)
        .replace('${row}', item.row)
        .replace('${field}', item.field)
        .replace('${msg}', item.msg.join(', '));
      messages.push(msg);
    } else if (item.section && item.field) {
      const msg = template2.replace('${section}', item.section).replace('${field}', item.field).replace('${msg}', item.msg.join(', '));
      messages.push(msg);
    } else if (item.field) {
      const msg = template1.replace('${field}', item.field).replace('${msg}', item.msg.join(', '));
      messages.push(msg);
    }
  }
  return messages.map((m) => `<li><small>${m}</small></li>`);
};

const getMsgToEs = <T extends object>(dataError: T): T => {
  if (!dataError) return dataError;
  const _dataError = dataError;
  for (const [key, value] of Object.entries(_dataError)) {
    _dataError[key as keyof T] = (value as TErrorMsg[]).map((v) => MsgError[v] || v) as unknown as T[keyof T];
  }
  return _dataError;
};

const getIsStatusError = (statusCode: StatusCode) => {
  if (statusCode == StatusCode.ok) return false;
  if (statusCode == StatusCode.created) return false;
  if (statusCode == StatusCode.updated) return false;
  if (statusCode == StatusCode.deleted) return false;
  if (statusCode == StatusCode.authenticated) return false;

  return true;
};
