import { Cart, CartItem } from '../../cart/models';

export type Order = {
  id?: string;
  userId: string;
  cartId: string;
  items: CartItem[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: string;
  total: number;
};

export type OrderFromDB = {
  id: string;
  user_id: string;
  cart_id: string;
  address: {
    address: string;
    comment: string;
    firstName: string;
    lastName: string;
  };
  cart: Cart;
  payment?: {};
  status: string;
  total: number;
};

export type OrderReq = {
  id: string;
  userId: string;
  cartId: string;
  address: {
    address: string;
    comment: string;
    firstName: string;
    lastName: string;
  };
  items: CartItem[];
  payment?: {};
  statusHistory: { status: string; timestamp?: number; comment?: string };
  total: number;
};
