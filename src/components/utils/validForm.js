export const validateFields = (data) => {
  const errors = {};
  if (data.fullName.length < 2) {
    errors.fullName = "First name is required";
  }
  if (data.email.length < 5 && !data.email.endsWith("gmail.com")) {
    errors.email = "Email is required and should end with gmail.com";
  }

  if (data.password.length < 5) {
    errors.password = "Password should contains 4 characteres";
  }
  if (data.selectedCountry.length < 2) {
    errors.selectedCountry = "Selecte a country";
  }
  if (data.region.length < 2) {
    errors.region = "select a region";
  }
  if (data.gender < 2) {
    errors.gender = "select your gender";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};
