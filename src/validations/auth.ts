import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.boolean().optional(),
});

export const signupSchema = z
  .object({
    familyName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' })
      .max(32, { message: 'First name cannot exceed 32 characters' }),
    givenName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters' })
      .max(32, { message: 'Last name cannot exceed 32 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().regex(/^[0-9]{11}$/, {
      message: 'Please enter a valid 10-digit phone number',
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
          'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });

export const verifiyEmailSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export const forgotPaswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });
