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
        result: createdProductInDB,
        success: true
      }
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
