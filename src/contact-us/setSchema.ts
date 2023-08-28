import * as yup from 'yup';

export const signUpEmailSchema = {
  email: yup
    .string()
    .trim()
    .required('email Required')
    .matches(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'must Be Email',
    ),
  address: yup.string().trim().required('Address Required'),
  firstName: yup.string().trim().required('First Name Required'),
  lastName: yup.string().trim().required('Last Name Required'),
  companyName: yup.string().trim().required('Company Name Required'),  
  phoneNumber: yup.string().trim().required('Phone Number Required'),
  comments: yup.string().trim().required('Comments Required'),
};

export const setSignUpEmailSchema = yup.object().shape(signUpEmailSchema);
