import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { checkoutDtoArr } from './dto/checkout.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  findAll(
    @Query('status') status: string,
    @Req() req: any
  ) {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post('checkout')
  async checkout(@Body() body: checkoutDtoArr, @Req() req: any) {
    return await this.ordersService.checkout(body, req.user);
  }
}