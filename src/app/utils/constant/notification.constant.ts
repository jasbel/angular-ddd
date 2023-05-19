import { StatusCode } from '../interfaces';

export const notyStatus: { [key in StatusCode]: string } = {
  [StatusCode.ok]: 'Peticion Realiza Correctamente',
  [StatusCode.success]: 'Peticion Realiza Correctamente',
  [StatusCode.created]: 'Guardado Correctamente',
  [StatusCode.updated]: 'Modificado Correctamente',
  [StatusCode.deleted]: 'Eliminado Satisfactoriamente',
  [StatusCode.authenticated]: 'Usuario Authenticado',
  [StatusCode.errRequest]: 'Error en la Peticion',
  [StatusCode.notFound]: 'Ruta no encontrada',
  [StatusCode.alreadyExist]: 'El dato ya se encuentra registrado',
  [StatusCode.validationFailed]: 'Validacion fallida: ',
  [StatusCode.tokenExpired]: 'Token Expirado',
  [StatusCode.errorAuthentication]: 'Error de Authenticacion',
  [StatusCode.errorAuthorization]: 'Error de Autorizacion',
  [StatusCode.serverError]: 'Error interno del Servidor',
};

export const BgColorByStatus: { [key in StatusCode]: string } = {
  [StatusCode.ok]: 'bg-primary',
  [StatusCode.success]: 'bg-primary',
  [StatusCode.created]: 'bg-success',
  [StatusCode.updated]: 'bg-success',
  [StatusCode.deleted]: 'bg-secondary',
  [StatusCode.authenticated]: 'bg-info',
  [StatusCode.errRequest]: 'bg-warning',
  [StatusCode.notFound]: 'bg-warning',
  [StatusCode.alreadyExist]: 'bg-warning',
  [StatusCode.validationFailed]: 'bg-danger',
  [StatusCode.tokenExpired]: 'bg-danger',
  [StatusCode.errorAuthentication]: 'bg-danger',
  [StatusCode.errorAuthorization]: 'bg-danger',
  [StatusCode.serverError]: 'bg-danger',
};
