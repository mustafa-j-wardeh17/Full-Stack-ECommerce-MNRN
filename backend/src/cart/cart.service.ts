import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/shared/repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addToCart(product: string, sku: string, userId: string) {
    return this.cartRepository.createCartItem({ product, sku, userId });
  }

  async getCartByUser(userId: string) {
    return this.cartRepository.findCartByUser(userId);
  }

  async removeFromCart(cartId: string) {
    return this.cartRepository.removeCartItem(cartId);
  }

  async updateCartItem(cartId: string, updateData: { sku?: string }) {
    return this.cartRepository.updateCartItem(cartId, updateData);
  }
}
