import { object, string, TypeOf } from 'zod';

export const registerUserSchema = object({
  name: string().nonempty({ message: 'Name is required' }),
  email: string()
    .nonempty({ message: 'Email is required' })
    .email('Not a valid email'),
  password: string()
    .nonempty({ message: 'Password is required' })
    .min(6, 'Password too short - should be 6 chars minimum'),
  passwordConfirmation: string().nonempty({
    message: 'Password confirmation is required',
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
