import { Request, Response } from 'express';
import { omit } from 'lodash';

import { CreateUserInput } from '../schema/user.schema';

import { createUser } from '../service/user.service';

import logger from '../utils/logger';

export const createUserHandler = async (
  request: Request<{}, {}, CreateUserInput['body']>,
  response: Response
) => {
  try {
    // Create new user
    const user = await createUser(request.body);

    return response.status(201).send(user);
  } catch (error: any) {
    logger.error(error);
    response.status(409).json(error.message);
  }
};

export const getCurrentUserHandler = (request: Request, response: Response) => {
  return response.send(response.locals.user);
};
