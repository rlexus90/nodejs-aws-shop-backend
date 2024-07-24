import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { OrderService } from './services';
import { Order, OrderReq } from './models';
import { CartItem } from '../cart/index';
import axios from 'axios';
import { apiPath } from '../constants';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders() {
    const orders = await this.orderService.getOrders();
    const data: OrderReq[] = orders.map((order) => {
      return {
        id: order.id,
        userId: order.user_id,
        cartId: order.cart_id,
        items: order.cart.items as CartItem[],
        address: order.address,
        statusHistory: { status: order.status },
        total: order.total,
      };
    });
    return data;
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    try {
      const order = await this.orderService.getOrderById(id);

      if (order) {
        // console.log(order.cart.items)
        if (order.cart.items.length > 0) {
          const items = await Promise.all(
            order.cart.items.map(async (item) => {
              const res = await axios.get(
                `${apiPath.products}/products/${item.product_id}`,
              );
              return { product: res.data, count: item.count } as CartItem;
            }),
          );
          return {
            id: order.id,
            userId: order.user_id,
            cartId: order.cart_id,
            items,
            address: order.address,
            statusHistory: { status: order.status },
            total: order.total,
          };
        }
      }
    } catch (e) {
      console.log(e);
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    try {
      await this.orderService.delOrder(id);
    } catch (e) {
      console.log(e);
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
