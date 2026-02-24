export const checkValidaData = (
  email,
  password,
  isSignInForm,
  name,
  phoneNumber
) => {

  const isEmailValid =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/.test(password);

  if (!isEmailValid) {
    return "Please enter a valid email address.";
  }

  if (!isPasswordValid) {
    return "Please enter a valid password.";
  }

  if (!isSignInForm) {

    const isNameValid = /^[A-Za-z ]{3,30}$/.test(name);
    if (!isNameValid) {
      return "Please enter a valid name.";
    }

    const isPhoneNumberValid = /^[7-9]\d{9}$/.test(phoneNumber);
    if (!isPhoneNumberValid) {
      return "Please enter a valid phone number.";
    }
  }

  return true;
};