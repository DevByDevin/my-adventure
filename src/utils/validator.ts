export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  confirmPassword?: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';

  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0) return 'Email cannot be empty';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) return 'Invalid email format';

  if (trimmedEmail.length > 254) return 'Email is too long';

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';

  if (password.length < 6) return 'Password must be at least 6 characters';

  if (password.length > 128) return 'Password is too long';

  return null;
};

export const validateLoginInput = (data: LoginData): ValidationResult => {
  const errors: string[] = [];

  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.push(passwordError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateRegisterInput = (data: RegisterData): ValidationResult => {
  const errors: string[] = [];

  const emailError = validateEmail(data.email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.push(passwordError);

  if (data.confirmPassword && data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sanitizeInput = (data: LoginData | RegisterData) => {
  return {
    email: data.email.trim().toLowerCase(),
    password: data.password,
  };
};
