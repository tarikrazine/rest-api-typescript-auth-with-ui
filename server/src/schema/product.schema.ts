import { number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    user: string().optional(),
    title: string({
      required_error: 'Title is required!',
    }),
    description: string({
      required_error: 'Description is required!',
    }),
    price: number({
      required_error: 'Price is required!',
    }),
    image: string({
      required_error: 'Image is required!',
    }),
  }),
};

export const params = {
  params: object({
    productID: string({
      required_error: 'Product id required!',
    }),
  }),
};

export const createProductInput = object({
  ...payload,
});

export const findProductInput = object({
  ...params,
});

export const updateProductInput = object({
  ...params,
  ...payload,
});

export const deleteProductInput = object({
  ...params,
});

export type DeleteProductInput = TypeOf<typeof deleteProductInput>;

export type UpdateProductInput = TypeOf<typeof updateProductInput>;

export type FindProductInput = TypeOf<typeof findProductInput>;

export type CreateProductInput = Omit<
  TypeOf<typeof createProductInput>,
  'body["user"]'
>;
