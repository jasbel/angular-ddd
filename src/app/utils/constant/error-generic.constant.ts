import { TErrorMsg } from '../interfaces';

export const MsgError: { [key in TErrorMsg]: string } = {
  _: 'El valor no es ...',
  ALREADY_EXISTS: 'El valor ya existe',
  TOO_LOW_ERROR: 'El valor es demasiado corto',
  IS_BLANK_ERROR: 'Esta vacio',
  IS_NOT_FOUND: 'No se encuentra',
  INVALID_CHARACTERS_ERROR: 'El valor no es de caracteres válidos',
  STRICT_CHECK_FAILED_ERROR: 'El valor fallo en comprobación estricta',
  TOO_SHORT_ERROR: 'El valor es demasiado corto',
  INVALID_FORMAT_ERROR: 'Error de formato no válido',
  MISSING_FIELD_ERROR: 'Error de campo faltante',
  NO_SUCH_FIELD_ERROR: 'No existe el campo en el formulario',
  NO_SUCH_CHOICE_ERROR: 'No se encuentra dentro de la selección',
  INVALID_TYPE_ERROR: 'Error de tipo no válido',
  ENTITY_ASSIGN_TO_USER: 'Entidad ya asignada al Usuario',
  ENTITY_ASSIGN_TO_DLA: 'Entidad ya asignada a AVDs',
  INVALID_MIME_TYPE_ERROR: 'Tipo de archivo inválido',
  TOO_LARGE_ERROR: 'Excede el limite del campo',
  NIF_NUMBER_DUPLICATE: 'DNI (nif) duplicado',
  ERROR_TYPE: 'El tipo no coincide',
  ENTITY_ASSIGN: 'Entidad Asignada',
  DOCUMENT_NUMBER_DUPLICATE: 'Numero de Documento duplicado',
  DOCUMENT_OTHER_CENTER_DUPLICATE: 'Uno de los residentes ya está registrado en otro centro',
  ERROR_FORMAT_FILE: 'Formato inválido',
  IN_USE: 'Esta plantilla ya tiene respuesta, no puede ser modificada',
  ERROR_DATE: 'El item no se actualizo, la fecha ya no es valida',
  NOT_FOUND_ERROR: 'No se encontro el problema, comuniquese con el admin',
  'This value should be of type string.': 'El Valor  deberia ser de tipo string',
  INVALID_VARIANT_ERROR: 'Es invalido o dejo de existir',
  INCORRECT_SWIFT_CODE_NUMBER: 'El bic/swift es invalido',
  INCORRECT_IBAN_CODE_NUMBER: 'El Iban es invalido',
  ERROR_ALREADY_EXISTS: 'El conjunto de datos ya existe',
  TOO_LONG_ERROR: 'El valor/texto es demasiado largo',
};