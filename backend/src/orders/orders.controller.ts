import { Controller, Get, Post, Body, Param, Query, Req, Headers, InternalServerErrorException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { checkoutDtoArr } from './dto/checkout.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  findAll(
    @Query('status') status: string,
    @Req() req: Record<string, any>
  ) {
    return this.ordersService.findAll(status, req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @Post('checkout')
  async checkout(@Body() body: checkoutDtoArr, @Req() req: any) {
    return await this.ordersService.checkout(body, req.user);
  }


  @Post('/webhook')
  async webhook(
    @Body() rawBody: Buffer,
    @Headers('stripe-signature') sig: string,
  ) {
    return await this.ordersService.webhook(rawBody, sig);
  }




}
