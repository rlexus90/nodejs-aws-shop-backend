import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductService {
  private products = [];

  async getAll() {
    console.log('Get products');
    if (this.products.length > 0) return this.products;
    try {
      const resp = await axios.get(`${process.env.PRODUCT}/products`);
      this.products = resp.data;
      setTimeout(() => (this.products = []), 120000);
      return resp.data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string) {
    console.log(`Get product by id: ${id}`);
    try {
      const resp = await axios.get(`${process.env.PRODUCT}/products/${id}`);
      return resp.data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delById(id: string) {
    console.log(`Delete product by id: ${id}`);
    try {
      const resp = await axios.delete(`${process.env.PRODUCT}/products/${id}`);
      return resp.data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createProduct(body: any) {
    console.log(`Create/Update  product`);
    console.log(body);
    try {
      const resp = await axios.put(`${process.env.PRODUCT}/products`, body);
      return resp.data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
