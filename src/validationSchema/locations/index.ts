import * as yup from 'yup';

export const locationValidationSchema = yup.object().shape({
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  zip_code: yup.string().required(),
  street: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
