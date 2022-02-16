import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

import ProductModel, {
  ProductDocument,
  Product,
} from '../models/product.model';

export const createProduct = (
  input: Omit<Product, 'user' | 'productID' | 'createdAt' | 'updatedAt'>
) => {
  return ProductModel.create(input);
};

export const findProduct = (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ProductModel.findOne(query, {}, options);
};

export const updateProduct = (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ProductModel.findOneAndUpdate(query, update, options);
};

export const deleteProduct = (query: FilterQuery<ProductDocument>) => {
  return ProductModel.deleteOne(query);
};
