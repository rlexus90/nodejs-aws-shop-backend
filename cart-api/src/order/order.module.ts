import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DataBaseModule } from '../data-base/data-base.module';
import { OrderController } from './order.controller';

@Module({
  imports: [DataBaseModule],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
