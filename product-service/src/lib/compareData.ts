import { Product, ProductDB, StocksDB } from '../types/product';

export const compareDataRequest = (
  products: ProductDB | ProductDB[],
  stocks: StocksDB | StocksDB[]
): Product | Product[] | ProductDB | ProductDB[] => {
  if (!Array.isArray(products)) {
    if (!stocks) return products as ProductDB;
    const { count } = stocks as StocksDB;
    const data: Product = { ...(products as ProductDB), count };
    return data;
  }

  if (Array.isArray(stocks) && stocks.length === 1) {
    const data = products.map((product) =>
      stocks[0].product_id === product.id
        ? { ...product, count: stocks[0].count }
        : product
    );
    return data;
  }
  if (!Array.isArray(stocks)) return products;

  const data = products.map((product) => {
    const index = stocks.findIndex((item) => item.product_id === product.id);
    if (index === -1) return product;
    const count = stocks[index].count;
    stocks.splice(index, 1);
    return { ...product, count };
  });

  return data;
};
