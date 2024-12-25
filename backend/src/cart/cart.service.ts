import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/shared/repositories/cart.repository';
import { Cart } from 'src/shared/schema/cart';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) { }

  // Add a new cart item
  async addCartItem(cartData: Partial<Cart>): Promise<{
    message: string,
    result: Cart,
    success: boolean
  }> {
    const cart = await this.cartRepository.createCartItem(cartData);
    return {
      message: 'Item added successfullly to cart',
      result: cart,
      success: true
    }
  }

  // Get all cart items for a user
  async getCartItemsByUser(userId: string): Promise<{
    message: string,
    result: {
      cart: Cart[]
    },
    success: boolean
  }> {
    const cart: Cart[] = await this.cartRepository.findCartByUser(userId)

    return {
      success: true,
      result: {
        cart
      },
      message: 'Cart fetched successfully'
    };
  }

  // Update a cart item by ID
  async updateCartItem(cartId: string, updateData: Partial<Cart>): Promise<{
    result: Cart,
    success: boolean
  }> {
    const cart = await this.cartRepository.updateCartItem(cartId, updateData);

    return {
      success: true,
      result: cart
    }
  }

  // Remove a cart item by ID
  async removeCartItem(cartId: string): Promise<{
    result: null,
    message: string,
    success: true
  }> {
    await this.cartRepository.removeCartItem(cartId);
    return {
      message: 'Item deleted successfully from the cart',
      result: null,
      success: true
    }
  }

  // Clear all cart items for a user
  async clearCartByUser(userId: string): Promise<{
    result: null,
    message: string,
    success: true
  }> {
    await this.cartRepository.clearCartByUser(userId);

    return {
      message: 'Cart has been reset successfully',
      result: null,
      success: true
    }
  }

  // Increment the quantity of a cart item
  async incrementCartItemQuantity(cartId: string, incrementBy: number): Promise<Cart | null> {
    return this.cartRepository.incrementCartItemQuantity(cartId, incrementBy);
  }
}
