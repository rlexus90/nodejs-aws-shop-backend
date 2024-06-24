import { ProductDB, StocksDB } from '../types/product';

export const products: ProductDB[] = [
  {
    description: 'Short Product Description1',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
    price: 24,
    title: 'ProductOne',
  },
  {
    description: 'Short Product Description7',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
    price: 15,
    title: 'ProductTitle',
  },
  {
    description: 'Short Product Description2',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
    price: 23,
    title: 'Product',
  },
  {
    description: 'Short Product Description4',
    id: '7567ec4b-b10c-48c5-9345-fc73348a80a1',
    price: 15,
    title: 'ProductTest',
  },
  {
    description: 'Short Product Description1',
    id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
    price: 23,
    title: 'Product2',
  },
  {
    description: 'Short Product Description7',
    id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
    price: 15,
    title: 'ProductName',
  },
];

export const stocks: StocksDB[] = [
  {
    product_id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
    count: 1,
  },
  {
    product_id: '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
    count: 2,
  },
  {
    product_id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
    count: 3,
  },
  {
    product_id: '7567ec4b-b10c-48c5-9345-fc73348a80a1',
    count: 4,
  },
  {
    product_id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
    count: 5,
  },
  {
    product_id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
    count: 6,
  },
];
