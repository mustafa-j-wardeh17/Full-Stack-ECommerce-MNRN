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
    return this.cartModel.find({ user: userId }).populate('product').exec();
  }

  // Function to remove a cart item by ID
  async removeCartItem(cartId: string): Promise<Cart> {
    return this.cartModel.findByIdAndDelete(cartId).exec();
  }

  // Function to update a cart item by ID
  async updateCartItem(cartId: string, updateData: Partial<Cart>): Promise<Cart> {
    return this.cartModel
      .findByIdAndUpdate(cartId, updateData, { new: true })
      .exec();
  }
}
