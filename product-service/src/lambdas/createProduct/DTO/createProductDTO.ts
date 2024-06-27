export type CreateProductDTO = {
  count: number;
  description: string;
  price: number;
  title: string;
};

export const validateBody = (body: string | undefined): void | object => {
  if (!body) return { message: 'Body can not be empty' };

  const { count, price, description, title } = JSON.parse(
    body
  ) as CreateProductDTO;

  const messages: string[] = [];

  count && Number.isInteger(count)
    ? null
    : messages.push('"count" required and must be Integer');
  count >= 0 ? null : messages.push('"count" must be 0 or bigger');

  price && Number.isInteger(price)
    ? null
    : messages.push('"price" required and must be Integer');
  price >= 0 ? null : messages.push('"price" must be 0 or bigger');

  description && typeof description === 'string'
    ? null
    : messages.push('"description" required and must be String');

  title && typeof title === 'string'
    ? null
    : messages.push('"title" required and must be String');

  if (messages.length === 0) return;

  return { message: messages };
};
