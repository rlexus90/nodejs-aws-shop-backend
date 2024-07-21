import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem, CartStatuses } from '../models';
import { PrismaService } from 'src/data-base/prisma/prisma.service';
import axios from 'axios';
import { apiPath } from 'src/constants';

@Injectable()
export class CartService {

	constructor(private prisma: PrismaService) {}
	
  private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }

 async createByUserId(userId: string) {
    const id:string = v4();
    const userCart = {
      id,
			user_id:userId,
    };

   await this.prisma.cart.create({data:userCart})

    return userCart;
  }

 async findOrCreateByUserId(userId: string): Promise<Cart> {
  
	try	{  
		const userCart =await this.prisma.cart.findFirst({
			where:{user_id:userId,
				status: CartStatuses.OPEN
			},
			include: { items: true },
		})

    if (userCart) {
const dbItems = userCart.items;

if(dbItems.length>0 ) {
	const items = await Promise.all(dbItems.map(async item => {
		const res = await axios.get(
			`${apiPath.products}/products/${item.product_id}`
		);
		return { product:res.data, count:item.count} as CartItem;
	}))

	return {...userCart, items} as unknown as Cart;
}
      return userCart as unknown as Cart;
    }

    return await this.createByUserId(userId) as Cart;}catch(e){
			console.log(e);
		}
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
