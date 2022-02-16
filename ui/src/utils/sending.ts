import axios from 'axios';

import { RegisterUserInput } from './registerSchema';
import { LoginUserInput } from './loginSchema';

const sending = async <T>(
  url: string,
  values: RegisterUserInput | LoginUserInput,
  options?: any
): Promise<T> => {
  try {
    return await axios.post(url, values, options);
  } catch (error: any) {
    return error;
  }
};

export default sending;
