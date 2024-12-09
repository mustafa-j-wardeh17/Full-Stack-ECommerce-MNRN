import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository) private readonly productDb: ProductRepository,
    @InjectStripeClient() private readonly stripeClient: Stripe
  ) { }
  async create(createProductDto: CreateProductDto) {
    try {
      // create a product in stripe
      if (!createProductDto.stripeProductId) {
        const createProductInStripe = await this.stripeClient.products.create({
          name: createProductDto.productName,
          description: createProductDto.description,
        })
        createProductDto.stripeProductId = createProductInStripe.id;
      }

      const createdProductInDB = await this.productDb.create(createProductDto)

      return {
        message: "Product created successfully",
        result: {
          product: createdProductInDB
        },
        success: true
      }
    } catch (error) {
      throw error
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const findProduct = await this.productDb.findById(id)
      if (!findProduct) {
        throw new Error('Product does not exist')
      }
      const updateProduct = await this.productDb.findOneAndUpdate(
        {
          _id: id,
        },
        updateProductDto

      )
      if (!updateProductDto.stripeProductId) {
        await this.stripeClient.products.update(
          findProduct.stripeProductId,
          {
            name: updateProduct.productName,
            description: updateProduct.description
          }
        )
      }
      return {
        message: 'Product updated successfully',
        result: updateProduct,
        success: true
      }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const findProduct = await this.productDb.findById(id)
      if (!findProduct) {
        throw new Error('Product does not exist')
      }
      return {
        message: 'Product fetched successfully',
        result: findProduct,
        success: true
      }
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all products`;
  }





  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
