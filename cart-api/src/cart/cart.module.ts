import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DataBaseModule } from 'src/data-base/data-base.module';



@Module({
  imports: [ OrderModule,DataBaseModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
