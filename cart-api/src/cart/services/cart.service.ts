import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem, CartStatuses } from '../models';
import { PrismaService } from '../../data-base/prisma/prisma.service';
import axios from 'axios';
import { apiPath } from '../../constants';
import { errorMonitor } from 'events';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Cart> {
    if (!userId) return;
    return this.findOrCreateByUserId(userId);
  }

  async createByUserId(userId: string) {
    const id: string = v4();
    const userCart = {
      id,
      user_id: userId,
    };

    await this.prisma.cart.create({ data: userCart });

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    if (!userId) return;
    try {
      const userCart = await this.prisma.cart.findFirst({
        where: { user_id: userId, status: CartStatuses.OPEN },
        include: { items: true },
      });

      if (userCart) {
        const dbItems = userCart.items;

        if (dbItems.length > 0) {
          const items = await Promise.all(
            dbItems.map(async (item) => {
              const res = await axios.get(
                `${apiPath.products}/products/${item.product_id}`,
              );
              return { product: res.data, count: item.count } as CartItem;
            }),
          );

          return { ...userCart, items } as unknown as Cart;
        }
        return userCart as unknown as Cart;
      }

      return (await this.createByUserId(userId)) as Cart;
    } catch (e) {
      console.log(e);
    }
  }

  async updateByUserId(userId: string, item: CartItem): Promise<Cart> {
    if (!userId) return;
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [
        ...rest.items.filter((el) => el.product.id !== item.product.id),
        item,
      ],
    };

    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id,
        },
        include: { items: true },
      });
      const updatedItem = cart.items.find(
        (el) => el.product_id === item.product.id,
      );

      if (updatedItem) {
        if (item.count === 0) {
          await this.prisma.cart_item.delete({
            where: { id: updatedItem.id },
          });
        } else {
          await this.prisma.cart_item.update({
            where: { id: updatedItem.id },
            data: { count: item.count },
          });
        }
      } else {
        await this.prisma.cart_item.create({
          data: {
            cart_id: cart.id,
            product_id: item.product.id,
            count: item.count,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }

    return { ...updatedCart };
  }

  async removeByUserId(userId: string): Promise<void> {
    if (!userId) return;

    try {
      const userCart = await this.prisma.cart.findFirst({
        where: { user_id: userId, status: CartStatuses.OPEN },
        include: { items: true },
      });
      if (userCart)
        await this.prisma.cart.delete({ where: { id: userCart.id } });
    } catch (e) {
      console.log(e);
    }
  }

  async setStatusORDERED(userId: string) {
    try {
      const userCart = await this.prisma.cart.findFirst({
        where: { user_id: userId, status: CartStatuses.OPEN },
        include: { items: true },
      });

      if (userCart)
        await this.prisma.cart.update({
          where: { id: userCart.id },
          data: { status: CartStatuses.ORDERED },
        });
    } catch (e) {
      console.log(e);
    }
  }
}
