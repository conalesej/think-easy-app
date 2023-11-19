export const isEmailValid = (value: string) => {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Invalid email address";
};

export const isPasswordValid = (value: string) => {
  return value.length >= 8 || "Password must be at least 8 characters";
};
