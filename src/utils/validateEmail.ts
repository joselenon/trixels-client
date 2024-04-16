import validator from 'validator';

const validateEmail = (value: string) => {
  if (!validator.isEmail(value) && value.length !== 0) {
    return { valid: false, errorMsg: 'Invalid E-mail.' };
  }
  return { valid: true, errorMsg: '' };
};

export default validateEmail;
