import * as yup from 'yup';

export const signUpEmailSchema = {
  password: yup
    .string()
    .trim()
    // .required('Password Required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
  confirmPassword: yup
    .string()
    .trim()
    // .required('Password Confirmation Required')
    .oneOf([yup.ref('password'), null], 'Password Must Be Matched'),
  city: yup.string().trim().required('City Required'),
  firstName: yup.string().trim().required('First Name Required'),
  lastName: yup.string().trim().required('Last Name Required'),
  companyName: yup.string().trim().required('Company Name Required'),  
};

export const setSignUpEmailSchema = yup.object().shape(signUpEmailSchema);
