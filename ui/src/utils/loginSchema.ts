import { object, string, TypeOf } from 'zod';

export const loginUserSchema = object({
  email: string()
    .nonempty({ message: 'Email is required' })
    .email('Not a valid email'),
  password: string()
    .nonempty({ message: 'Password is required' })
    .min(6, 'Password too short - should be 6 chars minimum'),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
