import axios from 'axios';
import { createProductPath } from '../constants';
import {
  ProductIncome,
  transformProduct,
} from './transformProduct';

export const createProduct = async (product: ProductIncome) => {
  try {
    const resp = await axios.post(createProductPath, transformProduct(product));
    return `Product ${product.title}`;
  } catch (err) {
    console.log(err);
  }
  return;
};
