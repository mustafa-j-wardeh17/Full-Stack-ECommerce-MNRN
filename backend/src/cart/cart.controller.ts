import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from 'src/shared/schema/cart';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  // Add a new cart item
  @Post()
  async addCartItem(@Body() cartData: Partial<Cart>) {
    return this.cartService.addCartItem(cartData);
  }

  // Get all cart items for a user
  @Get('user/:userId')
  async getCartItemsByUser(@Param('userId') userId: string) {
    return this.cartService.getCartItemsByUser(userId);
  }

  // Update a cart item
  @Patch(':cartId')
  async updateCartItem(
    @Param('cartId') cartId: string,
    @Body() updateData: Partial<Cart>,
  ) {
    return this.cartService.updateCartItem(cartId, updateData);
  }

  // Remove a cart item by ID
  @Delete(':cartId')
  async removeCartItem(@Param('cartId') cartId: string) {
    return this.cartService.removeCartItem(cartId);
  }

  // Clear all cart items for a user
  @Delete('user/:userId')
  async clearCartSelectedItemsByUser(
    @Param('userId') userId: string,
    @Body('cartIds') cartIds: string[],
  ) {
    return this.cartService.clearCartSelectedItemsByUser(userId,cartIds);
  }

  // Increment the quantity of a cart item
  @Patch('increment/:cartId')
  async incrementCartItemQuantity(
    @Param('cartId') cartId: string,
    @Body('incrementBy') incrementBy: number,
  ) {
    return this.cartService.incrementCartItemQuantity(cartId, incrementBy);
  }
}
