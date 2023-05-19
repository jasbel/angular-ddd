export const validateExcel = (file: File): boolean => {
  let regex = /(\.xls|\.xlsx)$/;
  let validate = regex.exec(file.name.toString());
  return !!validate;
};
