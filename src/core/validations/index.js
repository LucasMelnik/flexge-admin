import isEmail from 'validator/lib/isEmail';

export const isRequired = value => !value && 'Required';

export const minLength = minLengthInformed => value => value && value.length < minLengthInformed && `Min. length: ${minLengthInformed}`;

export const minFilteredLength = (minLengthInformed, filterPrediction, message) => value => (!value || value.filter(filterPrediction).length < minLengthInformed) && (message || `Min. length: ${minLengthInformed}`);

export const isValidEmail = (value) => {
  if (value && !isEmail(value)) {
    return 'Invalid email';
  }
  return null;
};

export const onlyOneCorrectAnswer = (answers) => {
  if (answers && answers.length) {
    const correctAnswers = answers.filter(answer => answer.correct);
    if (correctAnswers.length > 1) {
      return 'Please inform only one correct answer';
    }
    return null;
  }
  return null;
};
