import { useState, useEffect } from 'react';

type errors = {
  email?: string;
  password?: string;
  passwordRepeat?: string;
  verificationCode?: string;
  passwordOld?: string;
};

export const useFormValidation = (initialState, validate) => {
  const [ values, setValues ] = useState(initialState);
  const [ errors, setErrors ] = useState<errors>({});
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [ isValid, setValid ] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const foundErrors = Object.keys(errors).length === 0;
      setValid(foundErrors);
      setSubmitting(foundErrors);
    }
  }, [ errors ]);

  function handleChange(name: string, value: string) {
    setValues({
      ...values,
      [name]: value
    });
  }

  function resetValues() {
    setValues({ ...initialState });
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    resetValues,
    values,
    errors,
    isValid,
    setValid
  };
};
