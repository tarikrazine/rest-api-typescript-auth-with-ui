import { Express, Request, Response } from 'express';

import {
  getUserSessionHandler,
  createUserSessionHandler,
  deleteUserSessionHandler,
} from './controller/session.controller';
import {
  createUserHandler,
  getCurrentUserHandler,
} from './controller/user.controller';
import validateResource from './middleware/validateResource';
import requireUser from './middleware/requireUser';
import { createSessionInput } from './schema/session.schema';
import { createUserInput } from './schema/user.schema';
import {
  createProductInput,
  deleteProductInput,
  findProductInput,
  updateProductInput,
} from './schema/product.schema';
import {
  createProductHandler,
  deleteProductHandler,
  findProductHandler,
  updateProductHandler,
} from './controller/product.controller';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.get('/api/me', requireUser, getCurrentUserHandler);

  // User Route
  app.post('/api/users', validateResource(createUserInput), createUserHandler);

  // Sessions routes
  app.post(
    '/api/sessions',
    validateResource(createSessionInput),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionHandler);

  app.delete('/api/sessions', requireUser, deleteUserSessionHandler);

  // Product Routes
  app.post(
    '/api/products',
    [requireUser, validateResource(createProductInput)],
    createProductHandler
  );

  app.get(
    '/api/products/:productID',
    validateResource(findProductInput),
    findProductHandler
  );

  app.put(
    '/api/products/:productID',
    [requireUser, validateResource(updateProductInput)],
    updateProductHandler
  );

  app.delete(
    '/api/products/:productID',
    [requireUser, validateResource(deleteProductInput)],
    deleteProductHandler
  );
}

export default routes;
