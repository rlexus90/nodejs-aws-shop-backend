import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order, OrderFromDB } from '../models';
import { PrismaService } from '../../data-base/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  private orders: Record<string, Order> = {};

  findById(orderId: string): Order {
    return this.orders[orderId];
  }

  async create(data: any) {
    try {
      const id = v4();
      const order = {
        ...data,
        id,
      };
      const resp = await this.prisma.order.create({ data: order });
      return resp;
    } catch (e) {
      console.log(e);
    }
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    };
  }

  async getOrders(): Promise<OrderFromDB[]> {
    try {
      const orders = await this.prisma.order.findMany({
        include: { cart: { include: { items: true } } },
      });
      return orders as unknown as OrderFromDB[];
    } catch (e) {
      console.log(e);
    }
  }

  async getOrderById(id: string): Promise<OrderFromDB> {
    try {
      const orders = await this.prisma.order.findUnique({
        where: { id },
        include: { cart: { include: { items: true } } },
      });
      return orders as unknown as OrderFromDB;
    } catch (e) {
      console.log(e);
    }
  }

  async delOrder(id: string): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
