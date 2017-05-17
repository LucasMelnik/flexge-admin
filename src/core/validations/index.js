export const isRequired = value => !value && 'Required';

export const minLength = minLengthInformed => value => value && value.length < minLengthInformed && `Min. length: ${minLengthInformed}`;
