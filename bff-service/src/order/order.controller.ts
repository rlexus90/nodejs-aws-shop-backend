import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  HttpCode,
} from '@nestjs/common';
import axios from 'axios';

@Controller('order')
export class OrderController {
  @Get()
  async getOrders(@Headers('user') user) {
    console.log('Get all orders');
    try {
      const req = await axios.get(`${process.env.ORDER}/order`, {
        headers: { user },
        data: {},
      });
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  async getOrderById(@Headers('user') user, @Param('id') id: string) {
    console.log('Get order by Id');
    try {
      const req = await axios.get(`${process.env.ORDER}/order/${id}`, {
        headers: { user },
        data: {},
      });
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCart(@Headers('user') user, @Param('id') id: string) {
    console.log('del Order');
    try {
      const req = await axios.delete(`${process.env.CART}/order/${id}`, {
        headers: { user },
        data: {},
      });
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }
}
