export type TErrorMsg =
  | '_'
  | 'ALREADY_EXISTS'
  | 'TOO_LOW_ERROR'
  | 'IS_BLANK_ERROR'
  | 'IS_NOT_FOUND'
  | 'INVALID_CHARACTERS_ERROR'
  | 'STRICT_CHECK_FAILED_ERROR'
  | 'TOO_SHORT_ERROR'
  | 'INVALID_FORMAT_ERROR'
  | 'MISSING_FIELD_ERROR'
  | 'NO_SUCH_FIELD_ERROR'
  | 'INVALID_TYPE_ERROR'
  | 'ENTITY_ASSIGN_TO_USER'
  | 'NO_SUCH_CHOICE_ERROR'
  | 'ENTITY_ASSIGN_TO_DLA'
  | 'TOO_LARGE_ERROR'
  | 'NIF_NUMBER_DUPLICATE'
  | 'INVALID_MIME_TYPE_ERROR'
  | 'ERROR_TYPE'
  | 'IS_NOT_FOUND'
  | 'ALREADY_EXISTS'
  | 'ENTITY_ASSIGN'
  | 'DOCUMENT_NUMBER_DUPLICATE'
  | 'DOCUMENT_OTHER_CENTER_DUPLICATE'
  | 'IN_USE'
  | 'ERROR_DATE'
  | 'NOT_FOUND_ERROR'
  | 'ERROR_FORMAT_FILE'
  | 'INVALID_VARIANT_ERROR'
  | 'INCORRECT_SWIFT_CODE_NUMBER'
  | 'INCORRECT_IBAN_CODE_NUMBER'
  | 'ERROR_ALREADY_EXISTS'
  | 'TOO_LONG_ERROR'
  | 'This value should be of type string.';

export interface IErrorObject<T = string> {
  section: T;
  row: T;
  field: T;
  msg: T[];
}

export enum EError400Msg {
  'Updated error' = 'Error de Actualizacion',
  'Take updated error' = 'No se puede validar todas las tomas, han pasado más de 4h',
  'Validation swift code number error' = 'Error de número de código Swift de validación',
  'Validation iban code number error' = 'Error de número IBAN de validación',
  "Already exist. Can't be create" = 'Ya existe. No se puede crear',
  'Invoice already published' = 'La factura ya fue publicada, ya no puede modificarla',
  'Invoice is corrective, it can`t duplicate' = 'La factura es rectificativa, no puede duplicar',
  'Time for activity update was expired.' = 'El tiempo para la actualización (-4hrs) de la actividad expiró.',
  'default' = 'Peticion incorrecta',
}

export type TError400Msg = keyof typeof EError400Msg;

export enum EErrorMsgCore {
  validError = 'Validation error',
}
