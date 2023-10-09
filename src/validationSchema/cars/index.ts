import * as yup from 'yup';

export const carValidationSchema = yup.object().shape({
  model: yup.string().required(),
  brand: yup.string().required(),
  year: yup.number().integer().required(),
  color: yup.string().required(),
  registration_number: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
