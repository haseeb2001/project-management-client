import * as Yup from 'yup';

export const RegisterScehma = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password required'),
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Username required'),
});

export const AuthSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password required'),
});
