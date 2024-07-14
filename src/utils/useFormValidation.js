import { reactive } from "@vue/reactivity";
const errors = reactive({});
import useValidators from "@/utils/validators";

export default function useFormValidation() {
  const { isEmpty, minLength, isEmail, lastFourLength, isNum } =
    useValidators();

  const validateNameField = (fieldName, fieldValue) => {
    errors[fieldName] = fieldValue === "" ? "Ce champs est obligatoire !" : "";
    // errors[fieldName] = !fieldValue
    //   ? isEmpty(fieldName, fieldValue)
    //   : minLength(fieldName, fieldValue, 4);
  };
  const validateLastFourDigitField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : lastFourLength(fieldName, fieldValue, 4);
  };
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue);
  };

  const validateNumberField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isNum(fieldName, fieldValue);
  };

  return {
    errors,
    validateNameField,
    validateEmailField,
    validateNumberField,
    validateLastFourDigitField,
  };
}
