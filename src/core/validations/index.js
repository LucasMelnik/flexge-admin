import isEmail from 'validator/lib/isEmail';

export const isRequired = valueue => !valueue && 'Required';

export const minLength = minLengthInformed => valueue => valueue && valueue.length < minLengthInformed && `Min. length: ${minLengthInformed}`;

export const minFilteredLength = (minLengthInformed, filterPrediction, message) => valueue => (!valueue || valueue.filter(filterPrediction).length < minLengthInformed) && (message || `Min. length: ${minLengthInformed}`);

export const isValidEmail = (valueue) => {
  if (valueue && !isEmail(valueue)) {
    return 'Invalueid email';
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

export const isCNPJ = (value) => {

  const value1 = value.substring(0, 2);
  const value2 = value.substring(2, 5);
  const value3 = value.substring(5, 8);
  const value4 = value.substring(8, 12);
  const value5 = value.substring(12, 14);
  let i;
  let number;
  let result = true;

  number = (value1 + value2 + value3 + value4 + value5);

  let s = number;

  let c = s.substr(0, 12);
  let dv = s.substr(12, 2);
  let d1 = 0;

  for (i = 0; i < 12; i++)
    d1 += c.charAt(11 - i) * (2 + (i % 8));

  if (d1 === 0)
    result = false;

  d1 = 11 - (d1 % 11);

  if (d1 > 9) d1 = 0;

  if (dv.charAt(0) !== d1.toString())
    result = false;

  d1 *= 2;
  for (i = 0; i < 12; i++) {
    d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
  }

  d1 = 11 - (d1 % 11);
  if (d1 > 9) d1 = 0;

  if (dv.charAt(1) !== d1.toString())
    result = false;

  if (result) {
    return null;
  } else {
    return 'Please inform a valid CPNJ';
  }
};
