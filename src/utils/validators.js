export default function useValidators() {

  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "Ce champs ne doit pas être vide" : "";
  };

  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `Veuillez entrer au moins ${min} caractères`
      : "";
  };

  const lastFourLength = (fieldName, fieldValue, nb) => {
      return fieldValue.length < nb || fieldValue.length > nb
        ? `Ce champs doit avoir ${nb} chiffres !`
        : "";
  };

  const isEmail = (fieldName, fieldValue) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue)
      ? "Veuillez entrer une adresse " + fieldName + " valide"
      : "";
  };

  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue);
    return !isNum ? "Veuillez entrer des caractères numériques uniquement" : "";
  };

  return { isEmpty, minLength, isEmail, isNum, lastFourLength };
}
