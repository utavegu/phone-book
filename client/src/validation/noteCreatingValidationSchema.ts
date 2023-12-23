import * as yup from 'yup';
import { VALIDATION_ERROR } from '~/constants/validation-errors';

export const noteCreatingValidationSchema = yup.object().shape({
  surname: yup
    .string()
    .required(VALIDATION_ERROR.IS_REQUIRED)
    .matches(/^[А-ЯЁ][а-яё]*$/, VALIDATION_ERROR.RU_NAMING)
    .min(2, VALIDATION_ERROR.MIN_2_CHAR)
    .max(20, VALIDATION_ERROR.MAX_20_CHAR),
  name: yup
    .string()
    .required(VALIDATION_ERROR.IS_REQUIRED)
    .matches(/^[А-ЯЁ][а-яё]*$/, VALIDATION_ERROR.RU_NAMING)
    .min(2, VALIDATION_ERROR.MIN_2_CHAR)
    .max(20, VALIDATION_ERROR.MAX_20_CHAR),
  patronymic: yup
    .string()
    .matches(/^[А-ЯЁ][а-яё]*$/, VALIDATION_ERROR.RU_NAMING)
    .min(2, VALIDATION_ERROR.MIN_2_CHAR)
    .max(20, VALIDATION_ERROR.MAX_20_CHAR),
  phone: yup
    .string()
    .required(VALIDATION_ERROR.IS_REQUIRED)
    .matches(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/, VALIDATION_ERROR.RU_PHONE_NUMBER),
  email: yup
    .string()
    .required(VALIDATION_ERROR.IS_REQUIRED)
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, VALIDATION_ERROR.IS_EMAIL),
  city: yup
    .string()
    .matches(/^[А-ЯЁ][\sа-яА-ЯЁё-]*$/, VALIDATION_ERROR.RU_TITLING)
    .min(2, VALIDATION_ERROR.MIN_2_CHAR)
    .max(50, VALIDATION_ERROR.MAX_50_CHAR),
  street: yup
    .string()
    .matches(/^[А-ЯЁ][\sа-яА-ЯЁё-]*$/, VALIDATION_ERROR.RU_TITLING)
    .min(2, VALIDATION_ERROR.MIN_2_CHAR)
    .max(50, VALIDATION_ERROR.MAX_50_CHAR),
  house: yup
    .number()
    .typeError(VALIDATION_ERROR.IS_NUMBER)
    .integer(VALIDATION_ERROR.IS_INT)
    .positive(VALIDATION_ERROR.IS_POSITIVE_NUMBER)
    .min(1, VALIDATION_ERROR.NUMBER_MIN_VALUE_1)
    .max(300, VALIDATION_ERROR.NUMBER_MAX_VALUE_300),
  flat: yup
    .number()
    .typeError(VALIDATION_ERROR.IS_NUMBER)
    .integer(VALIDATION_ERROR.IS_INT)
    .positive(VALIDATION_ERROR.IS_POSITIVE_NUMBER)
    .min(1, VALIDATION_ERROR.NUMBER_MIN_VALUE_1)
    .max(5000, VALIDATION_ERROR.NUMBER_MAX_VALUE_5000),
});
