import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { Products } from 'src/shared/schema/products';
import qs2m from 'qs-to-mongo';
import { GetProductQueryDto } from './dto/get-product-query-dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository) private readonly productDb: ProductRepository,
    @InjectStripeClient() private readonly stripeClient: Stripe
  ) { }
  async createProduct(createProductDto: CreateProductDto): Promise<{
    message: string,
    result: {
      product: Products
    },
    success: boolean
  }> {
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

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<{
    message: string,
    result: {
      product: Products
    },
    success: boolean
  }> {
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
        result: {
          product: updateProduct
        },
        success: true
      }
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<{
    message: string,
    result: {
      product: Products
    },
    success: boolean
  }> {
    try {
      const findProduct = await this.productDb.findById(id)
      if (!findProduct) {
        throw new Error('Product does not exist')
      }
      return {
        message: 'Product fetched successfully',
        result: {
          product: findProduct
        },
        success: true
      }
    } catch (error) {
      throw error
    }
  }


  async remove(id: string): Promise<{
    message: string,
    success: boolean,
    result: null
  }> {
    try {
      const findProduct = await this.productDb.findById(id)
      if (!findProduct) {
        throw new Error('Product does not exist')
      }
      await this.productDb.findByIdAndDelete(id);
      await this.stripeClient.products.del(findProduct.stripeProductId)

      return {
        message: 'Product has been deleted successfully',
        success: true,
        result: null
      }
    } catch (error) {
      throw error
    }
  }

  async findAllProducts(query: GetProductQueryDto): Promise<{
    message: string,
    success: boolean,
    result: any
  }> {
    try {
      let callForHomePage = false;
      if (query.homepage == `true`) {
        callForHomePage = true;
      }
      delete query.homepage;
      const { criteria, options, links } = qs2m(query);

      // Move `skip` from criteria to options
      if (criteria.skip) {
        options.skip = +criteria.skip;
        delete criteria.skip;
      }
      //https://example.com/products?search=laptop&category=electronics&platformType=web&baseType=digital&homepage=true
      // Example values
      // criteria = {
      //   search: laptop, // Using regex for partial matching if configured
      //   category: "electronics",
      //   platformType: "web",
      //   baseType: "digital"
      // };

      // options = {
      //   limit: 10,  // Default limit for pagination
      //   skip: 0,    // Offset for pagination
      //   sort: { createdAt: -1 }, // Default sorting by creation date (descending)
      // };

      if (callForHomePage) {
        const products = await this.productDb.findProductWithGroupBy();
        return {
          message:
            products.length > 0
              ? 'Products fetched successfully'
              : 'No products found',
          result: {
            products
          },
          success: true,
        };
      }

      const { totalProductCount, products } = await this.productDb.find(
        criteria,
        options,
      );
      return {
        message:
          products.length > 0
            ? 'Products fetched successfully'
            : 'No products found',
        result: {
          metadata: {
            skip: options.skip || 0,
            limit: options.limit || 10,
            total: totalProductCount,
            pages: options.limit
              ? Math.ceil(totalProductCount / options.limit)
              : 1,
            links: links('/', totalProductCount),
          },
          products,
        },
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }






}
