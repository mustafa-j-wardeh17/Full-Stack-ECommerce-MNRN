import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schema/cart';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  // Function to create a cart item
  async createCartItem(cartData: Partial<Cart>): Promise<Cart> {
    const cartItem = new this.cartModel(cartData);
    return cartItem.save();
  }

  // Function to find cart items by user
  async findCartByUser(userId: string): Promise<Cart[]> {
    return await this.cartModel.find({ userId });
  }

  // Function to remove a cart item by ID
  async removeCartItem(cartId: string): Promise<Cart | null> {
    return this.cartModel.findByIdAndDelete(cartId).exec();
  }

  // Function to update a cart item by ID
  async updateCartItem(cartId: string, updateData: Partial<Cart>): Promise<Cart | null> {
    return this.cartModel
      .findByIdAndUpdate(cartId, updateData, { new: true })
      .exec();
  }

  // NEW: Function to clear all cart items for a specific user
  async clearCartByUser(userId: string): Promise<{ deletedCount: number }> {
    return this.cartModel.deleteMany({ userId }).exec();
  }

  // NEW: Function to increment the quantity of a cart item
  async incrementCartItemQuantity(cartId: string, incrementBy: number): Promise<Cart | null> {
    return this.cartModel
      .findByIdAndUpdate(cartId, { $inc: { quantity: incrementBy } }, { new: true })
      .exec();
  }

  // Function to find a cart item by user and SKU
  async findCartItemByUserAndSku(userId: string, skuId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ userId, skuId }).exec();
  }
}
