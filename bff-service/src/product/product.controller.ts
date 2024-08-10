import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Delete(':id')
  async delById(@Param('id') id: string) {
    return this.productService.delById(id);
  }

  @Put()
  async updateProduct(@Body() body: any) {
    return this.productService.createProduct(body);
  }

  @Post()
  async createProduct(@Body() body: any) {
    return this.productService.createProduct(body);
  }
}
