export const requiredOptions = { value: true, message: 'Field is required!' };
export const onlyNumberOptions = { value: true, message: 'Field need to be numer type!' };

export const passwordPatternOptions = { value: /^^(?=.*[\W_])(?=.*[A-Z]).+$/, message: 'Password pattern not meet!' };
export const emailPatternOptions = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: 'Email pattern not meet!',
};

export function minLength(minLength) {
  return {
    value: minLength,
    message: `Minimum ${minLength} letters`,
  };
}

export function maxLength(maxLength) {
  return {
    value: maxLength,
    message: `Minimum ${maxLength} letters`,
  };
}
