import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
} from '@nestjs/common';
import axios from 'axios';

@Controller('profile/cart')
export class CartController {
  @Get()
  async getCart(@Headers('user') user) {
    console.log('Get all cart');
    try {
      const req = await axios.get(`${process.env.CART}/profile/cart`, {
        headers: { user },
        data: {},
      });
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }

  @Put()
  async updateCart(@Headers('user') user, @Body() body) {
    console.log('update cart');
    try {
      const req = await axios.put(`${process.env.CART}/profile/cart`, body, {
        headers: { user },
      });
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }

  @Delete()
  async deleteCart(@Headers('user') user) {
    console.log('clear cart');
    try {
      const req = await axios.delete(`${process.env.CART}/profile/cart`, {
        headers: { user },
        data: {},
      });
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }

  @Post('checkout')
  async checkout(@Headers('user') user, @Body() body) {
    console.log('ccc');
    try {
      const req = await axios.post(
        `${process.env.CART}/profile/cart/checkout`,
        body,
        { headers: { user } },
      );
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }
}
