import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() body: { product: string; sku: string; user: string }) {
    return this.cartService.addToCart(body.product, body.sku, body.user);
  }

  @Get(':user')
  async getCartByUser(@Param('user') user: string) {
    return this.cartService.getCartByUser(user);
  }

  @Delete(':id')
  async removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(id);
  }
}
