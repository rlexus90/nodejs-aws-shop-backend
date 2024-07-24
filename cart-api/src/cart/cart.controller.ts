import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );
    console.log('get cart');
    if (!cart) return { message: 'You must provide user in headers' };
    return { cart, total: calculateCartTotal(cart) };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    // TODO: validate body payload...
    console.log('update cart');
    const cart = await this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      body,
    );

    if (!cart) return { message: 'You must provide user in headers' };
    return {
      cart,
      total: calculateCartTotal(cart),
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));
    console.log('clear cart');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    console.log('checkout');
    const userId = getUserIdFromRequest(req);
    if (!userId) return { message: 'You must provide user in headers' };

    const cart = await this.cartService.findByUserId(userId);
    if (!cart) return { message: 'Cart not found' };

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { id: cartId } = cart;
    const total = calculateCartTotal(cart);

    const { address } = body;

    const order = await this.orderService.create({
      address,
      user_id: userId,
      cart_id: cartId,
      total,
    });

    if (!order)
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Something went wrong...',
      };

    await this.cartService.setStatusORDERED(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
