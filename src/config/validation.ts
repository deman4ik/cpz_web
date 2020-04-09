export const validateAuth = (values) => {
  const errorFields: string[] = Object.keys(values);
  const errors: { email?: string; password?: string; passwordRepeat?: string; verificationCode?: string } = {};

  // Email Errors
  if (errorFields.includes('email')) {
    if (!values.email) {
      errors.email = 'Required Email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  }

  // Password Errors
  if (errorFields.includes('password')) {
    if (!values.password) {
      errors.password = 'Required Password';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/^[a-zA-Z0-9]+$/i.test(values.password)) {
      errors.password = 'Invalid password';
    }
    if (errorFields.includes('passwordRepeat')) {
      if (values.password !== values.passwordRepeat) {
        errors.passwordRepeat = 'Password and Repeat password must be equal';
      }
    }
  }

  // Verification Code Errors
  if (errorFields.includes('verificationCode')) {
    if (!values.verificationCode) {
      errors.verificationCode = 'Required Verification code';
    } else if (values.verificationCode.length !== 6) {
      errors.verificationCode = 'Verification code must be 6 characters';
    }
  }

  return errors;
};

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};
