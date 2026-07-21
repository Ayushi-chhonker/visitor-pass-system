/*
Validation Utility Functions
Purpose:
These helper functions are used to validate user input
before saving data into the database.

Keeping validation logic in one file avoids repeating
the same code in multiple controllers.
*/

// Validate Email
export const validateEmail = (email) => {
  /*
    This regular expression checks whether the email
    follows a basic format such as:
    example@gmail.com
    user123@yahoo.in
  */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Validate Phone Number
export const validatePhone = (phone) => {
  /*
    Accept only a 10-digit mobile number.
    Examples:
    9876543210  = Valid
    98765       = Invalid
    abc1234567  = Invalid
  */
  const phonePattern = /^[0-9]{10}$/;
  return phonePattern.test(phone);
};

// Check Required Fields
export const validateRequired = (...fields) => {
  /*
    The rest operator (...) allows any number of fields.
    every() returns true only when every field:
    - exists
    - is not null
    - is not an empty string after removing spaces
  */
  return fields.every(field => {
    return field && field.trim() !== "";
  });
};