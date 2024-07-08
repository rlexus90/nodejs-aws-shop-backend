export const transformProduct = (product: ProductIncome): ProductOutcome => {
  const newProduct: ProductOutcome = {
    title: product.title,
    description: product.description,
    price: Number(product.price),
    count: Number(product.count),
  };

  return newProduct;
};

export type ProductIncome = {
  id?: string;
  title: string;
  description: string;
  price: string;
  count?: string;
};

export type ProductOutcome = {
  title: string;
  description: string;
  price: number;
  count?: number;
  id?: string;
};

export type ProductDB = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type StocksDB = {
  product_id: string;
  count: number;
};
