import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/shared/repositories/cart.repository';
import { Cart } from 'src/shared/schema/cart';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  // Add a new cart item
  async addCartItem(cartData: Partial<Cart>): Promise<Cart> {
    return this.cartRepository.createCartItem(cartData);
  }

  // Get all cart items for a user
  async getCartItemsByUser(userId: string): Promise<Cart[]> {
    return this.cartRepository.findCartByUser(userId);
  }

  // Update a cart item by ID
  async updateCartItem(cartId: string, updateData: Partial<Cart>): Promise<Cart | null> {
    return this.cartRepository.updateCartItem(cartId, updateData);
  }

  // Remove a cart item by ID
  async removeCartItem(cartId: string): Promise<Cart | null> {
    return this.cartRepository.removeCartItem(cartId);
  }

  // Clear all cart items for a user
  async clearCartByUser(userId: string): Promise<{ deletedCount: number }> {
    return this.cartRepository.clearCartByUser(userId);
  }

  // Increment the quantity of a cart item
  async incrementCartItemQuantity(cartId: string, incrementBy: number): Promise<Cart | null> {
    return this.cartRepository.incrementCartItemQuantity(cartId, incrementBy);
  }
}
