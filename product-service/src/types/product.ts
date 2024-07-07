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

export interface Product extends ProductDB {
  count: number;
}
