import { Request, Response } from 'express';
import {
  CreateProductInput,
  FindProductInput,
  UpdateProductInput,
} from '../schema/product.schema';
import {
  createProduct,
  deleteProduct,
  findProduct,
  updateProduct,
} from '../service/product.service';

export const createProductHandler = async (
  request: Request<{}, {}, CreateProductInput['body']>,
  response: Response
) => {
  const user = response.locals.user;

  request.body.user = user._id;

  const newProduct = await createProduct(request.body);

  return response.status(201).send(newProduct);
};

export const findProductHandler = async (
  request: Request<FindProductInput['params'], {}, {}>,
  response: Response
) => {
  const productID = request.params;

  const product = await findProduct(productID);

  if (!product) {
    return response.sendStatus(404);
  }

  return response.status(200).send(product);
};

export const updateProductHandler = async (
  request: Request<UpdateProductInput['params']>,
  response: Response
) => {
  const user = response.locals.user;

  const productID = request.params;

  const product = await findProduct(productID);

  if (!product) {
    return response.sendStatus(404);
  }

  if (String(product.user) !== user._id) {
    return response.sendStatus(403);
  }

  const updatedProduct = await updateProduct(productID, request.body, {
    new: true,
  });

  return response.send(updatedProduct);
};

export const deleteProductHandler = async (
  request: Request<FindProductInput['params']>,
  response: Response
) => {
  const user = response.locals.user;

  const productID = request.params;

  const product = await findProduct(productID);

  if (!product) {
    return response.sendStatus(404);
  }

  if (String(product.user) !== user._id) {
    return response.sendStatus(403);
  }

  await deleteProduct(productID);

  return response.sendStatus(200);
};
