import isEmail from 'validator/lib/isEmail';

export const isRequired = value => !value && 'Required';

export const minLength = minLengthInformed => value => value && value.length < minLengthInformed && `Min. length: ${minLengthInformed}`;

export const isValidEmail = (value) => {
  if (value && !isEmail(value)) {
    return 'Invalid email';
  }
  return null;
};
