import { BadRequestException, Inject, Injectable, UploadedFile } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository, wishlistItems } from 'src/shared/repositories/product.repository';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { Products } from 'src/shared/schema/products';
import qs2m from 'qs-to-mongo';
import { GetProductQueryDto } from './dto/get-product-query-dto';
import cloudinary from 'cloudinary'
import config from 'config'
import { unlinkSync } from 'fs';
import { ProductSkuDto, ProductSkuDtoArr } from './dto/product-sku.dto';
import { License } from 'src/shared/schema/license';
import { OrdersRepository } from 'src/shared/repositories/order.repository';
import { SubscriberRepository } from 'src/shared/repositories/subscriber.repository';
import mongoose from 'mongoose';


@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository) private readonly productDb: ProductRepository,
    @Inject(OrdersRepository) private readonly OrderDb: OrdersRepository,
    @Inject(SubscriberRepository) private readonly subsicriberDb: SubscriberRepository,
    @InjectStripeClient() private readonly stripeClient: Stripe,
  ) {
    // setup cloudinary
    cloudinary.v2.config({
      cloud_name: config.get('cloudinary.cloud_name'),
      api_key: config.get('cloudinary.api_key'),
      api_secret: config.get('cloudinary.secret_key'),
    })
  }

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

      // Construct the email notification message
      const notificationMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="background-color: #4a90e2; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold;">
          New Product Alert from ByteVault!
        </div>
        <div style="padding: 20px;">
          <h1 style="font-size: 20px; color: #4a90e2;">${createProductDto.productName}</h1>
          <p><strong>Description:</strong> ${createProductDto.description}</p>
          <p><strong>Category:</strong> ${createProductDto.category}</p>
          <p><strong>Platform Type:</strong> ${createProductDto.platformType}</p>
          <p><strong>Base Type:</strong> ${createProductDto.baseType}</p>
          <p style="text-align: center;">Visit our website for more details!</p>
        </div>
        <div style="background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #666;">
          &copy; 2025 ByteVault. All rights reserved.
        </div>
      </div>
    `;

      // Send notification to all subscribers
      await this.subsicriberDb.sendNotificationToAll(notificationMessage);

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


      if (findProduct.skuDetails.length > 0) {
        let skuDataForUpdate = []
        // Now, update all SKU details in Stripe and in the database
        for (const skuData of updateProduct.skuDetails) {
          // Get corresponding SKU data from the passed `skuDetails` array

          // Update Stripe prices for each SKU
          const skuMetadata: Record<string, any> = {
            skuCode: skuData.skuCode,
            productId: id,
            price: skuData.price,
            productName: updateProductDto.productName,
            productImage: findProduct.image,
          };

          if (updateProduct.hasLicenses) {
            skuMetadata.lifetime = skuData.lifetime + '';
          }

          // Update Stripe price details for the SKU
          const priceDetails = await this.stripeClient.prices.create({
            unit_amount: skuData.price * 100, // convert to cents
            currency: 'usd',
            product: findProduct.stripeProductId,
            metadata: skuMetadata,
          });

          skuData.stripePriceId = priceDetails.id;
          skuDataForUpdate.push(skuData)
        }

        console.log('Num of sku updated ', skuDataForUpdate.length)
        await this.productDb.findOneAndUpdate(
          { _id: id },
          { $set: { skuDetails: skuDataForUpdate } }, // use push to push data to empty element to avoid error
        );
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
      product: Products,
      relatedProducts: Products[]
    },
    success: boolean
  }> {
    try {
      const findProduct = await this.productDb.findById(id)
      if (!findProduct) {
        throw new Error('Product does not exist')
      }
      const relatedProducts = await this.productDb.findRelatedProducts(
        {
          category: findProduct.category,
          _id: { $ne: new mongoose.Types.ObjectId(id) } // Ensure id is an ObjectId
        }
      )
      return {
        message: 'Product fetched successfully',
        result: {
          product: findProduct,
          relatedProducts
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

  async uploadProductImage(id: string, file: any): Promise<{
    message: string,
    success: boolean,
    result: string
  }> {
    try {
      const findProduct = await this.productDb.findById(id)
      if (!findProduct) {
        throw new Error('Product does not exist')
      }

      // destroy the exist image if found
      if (findProduct.imageDetails?.publicId) {
        await cloudinary.v2.uploader.destroy(findProduct.imageDetails.publicId, {
          invalidate: true
        })
      }

      // upload new image 
      const resOfCloudinary = await cloudinary.v2.uploader.upload(file.path, {
        folder: config.get('cloudinary.folder_path'),
        public_id: `${config.get('cloudinary.folder_path')}${Date.now()}`,
        transformation: [
          // {
          //   width: config.get('cloudinary.bigSize').toString().split('X')[0],
          //   height: config.get('cloudinary.bigSize').toString().split('X')[1],
          //   crop: "fill" // fill with width and heignt "scale" for image sizes give me scale image
          // },
          { quality: 'auto', effect: "upscale" }
        ],
      })

      unlinkSync(file.path);

      // upload to db
      const updateProduct = await this.productDb.findOneAndUpdate({
        _id: id,
      },
        {
          imageDetails: resOfCloudinary,
          image: resOfCloudinary.secure_url
        }
      )

      // edit image in stripe client
      await this.stripeClient.products.update(
        findProduct.stripeProductId,
        {
          images: [resOfCloudinary.secure_url]
        }
      )

      if (findProduct.skuDetails.length > 0) {
        let skuDataForUpdate = []
        // Now, update all SKU details in Stripe and in the database
        for (const skuData of updateProduct.skuDetails) {
          // Get corresponding SKU data from the passed `skuDetails` array

          // Update Stripe prices for each SKU
          const skuMetadata: Record<string, any> = {
            skuCode: skuData.skuCode,
            productId: id,
            price: skuData.price,
            productName: findProduct.productName,
            productImage: resOfCloudinary.secure_url,
          };

          if (updateProduct.hasLicenses) {
            skuMetadata.lifetime = skuData.lifetime + '';
          }

          // Update Stripe price details for the SKU
          const priceDetails = await this.stripeClient.prices.create({
            unit_amount: skuData.price * 100, // convert to cents
            currency: 'usd',
            product: findProduct.stripeProductId,
            metadata: skuMetadata,
          });

          skuData.stripePriceId = priceDetails.id;
          skuDataForUpdate.push(skuData)
        }

        console.log('Num of sku updated ', skuDataForUpdate.length)
        await this.productDb.findOneAndUpdate(
          { _id: id },
          { $set: { skuDetails: skuDataForUpdate } }, // use push to push data to empty element to avoid error
        );
      }

      return {
        message: 'Image uploaded successfully',
        success: true,
        result: resOfCloudinary.secure_url
      }
    } catch (error) {
      throw error
    }
  }


  // this is for create one or multiple sku for an product
  async updateProductSku(productId: string, data: ProductSkuDtoArr) {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      console.log(data)

      const skuCode = Math.random().toString(36).substring(2, 5) + Date.now();

      for (let i = 0; i < data.skuDetails.length; i++) {
        if (!data.skuDetails[i].stripePriceId) {
          const skuMetadata: Record<string, any> = {
            skuCode: skuCode,
            productId: productId,
            price: data.skuDetails[i].price,
            productName: product.productName,
            productImage: product.image,
          };

          // Add lifetime to metadata only if product.hasLicenses is true
          if (product.hasLicenses) {
            skuMetadata.lifetime = data.skuDetails[i].lifetime + '';
          }

          const stripPriceDetails = await this.stripeClient.prices.create({
            unit_amount: data.skuDetails[i].price * 100,
            currency: 'usd',
            product: product.stripeProductId,
            metadata: skuMetadata,
          });

          data.skuDetails[i].stripePriceId = stripPriceDetails.id;
        }
        data.skuDetails[i].skuCode = skuCode;
      }

      await this.productDb.findOneAndUpdate(
        { _id: productId },
        { $push: { skuDetails: data.skuDetails } }, // use push to push data to empty element to avoid error
      );

      return {
        message: 'Product sku updated successfully',
        success: true,
        result: null,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProductSkuById(
    productId: string,
    skuId: string,
    data: ProductSkuDto,
  ) {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      const sku = product.skuDetails.find((sku) => sku._id == skuId);
      if (!sku) {
        throw new Error('Sku does not exist');
      }

      if (data.price !== sku.price) {
        const skuMetadata: Record<string, any> = {
          skuCode: sku.skuCode,
          productId: productId,
          price: data.price,
          productName: product.productName,
          productImage: product.image,
        };

        // Add lifetime to metadata only if product.hasLicenses is true
        if (product.hasLicenses) {
          skuMetadata.lifetime = data.lifetime + '';
        }
        const priceDetails = await this.stripeClient.prices.create({
          unit_amount: data.price * 100,
          currency: 'usd',
          product: product.stripeProductId,
          metadata: skuMetadata
        });

        data.stripePriceId = priceDetails.id;
      }

      // because we can't set all data particularly so we can do one this 
      // we can individually update the data by adding 'skuDetails' before every key
      const dataForUpdate = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          dataForUpdate[`skuDetails.$.${key}`] = data[key];
        }
      }

      const result = await this.productDb.findOneAndUpdate(
        { _id: productId, 'skuDetails._id': skuId },
        { $set: dataForUpdate },
      );

      return {
        message: 'Product sku updated successfully',
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }


  async deleteProductSku(
    productId: string,
    skuId: string,
  ) {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      const sku = product.skuDetails.find((sku) => sku._id == skuId);
      if (!sku) {
        throw new Error('Sku does not exist');
      }


      const result = await this.productDb.deleteSku(productId, skuId)

      return {
        message: 'Product sku updated successfully',
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }

  async addProductSkuLicenses(
    productId: string,
    skuId: string,
    licenseKeys: string[],
  ): Promise<{
    message: string,
    success: boolean,
    result: {
      license: License[]
    },
  }> {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      if (!product.hasLicenses) {
        throw new Error('Product should not have licenses');
      }

      const sku = product.skuDetails.find((sku) => sku._id == skuId);
      if (!sku) {
        throw new Error('Sku does not exist');
      }

      const result = await this.productDb.createLicenses(
        productId,
        skuId,
        licenseKeys,
      );

      // Increment the remainingStock for the SKU
      await this.productDb.incrementSkuRemainingStock(productId, skuId, licenseKeys.length);

      return {
        message: 'License key added successfully',
        success: true,
        result: {
          license: result
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async removeProductSkuLicense(licenseId: string, productId: string, skuId: string): Promise<{
    message: string,
    success: boolean,
    result: null
  }> {
    try {

      const license = await this.productDb.findLicenseById(licenseId);
      if (!license) {
        throw new Error('License does not exist');
      }
      await this.productDb.removeLicense(licenseId);

      await this.productDb.decrementSkuRemainingStock(productId, skuId)
      return {
        message: 'License key removed successfully',
        success: true,
        result: null,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProductSkuLicenses(productId: string, skuId: string): Promise<{
    message: string,
    success: boolean,
    result: {
      licenses: License[]
    }
  }> {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      const sku = product.skuDetails.find((sku) => sku._id == skuId);
      if (!sku) {
        throw new Error('Sku does not exist');
      }

      const result = await this.productDb.findLicenses({
        product: productId,
        productSku: skuId,
      });

      return {
        message: 'Licenses fetched successfully',
        success: true,
        result: {
          licenses: result
        },
      };
    }
    catch (error) {
      throw error;
    }
  }

  async updateProductSkuLicense(
    productId: string,
    skuId: string,
    licenseKeyId: string,
    licenseKey: string,
  ): Promise<{
    message: string,
    success: boolean,
    result: {
      license: License
    }
  }> {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      const sku = product.skuDetails.find((sku) => sku._id == skuId);
      if (!sku) {
        throw new Error('Sku does not exist');
      }

      const result = await this.productDb.updateLicense(
        { _id: licenseKeyId },
        { licenseKey: licenseKey },
      );

      return {
        message: 'License key updated successfully',
        success: true,
        result: {
          license: result
        }
      };
    } catch (error) {
      throw error;
    }
  }


  async addProductReview(
    productId: string,
    rating: number,
    review: string,
    user: Record<string, any>,
  ): Promise<{
    message: string,
    success: boolean,
    result: {
      product: Products
    },
  }> {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      if (
        product.feedbackDetails.find(
          (value: { customerId: string }) =>
            value.customerId === user._id.toString(),
        )
      ) {
        throw new BadRequestException(
          'You have already gave the review for this product',
        );
      }

      const order = await this.OrderDb.findOne({
        userId: user._id.toString(),
        'orderedItems.productId': productId,
      });

      // To avoid reviewing for unpushased cusomer
      if (!order) {
        throw new Error('You have not purchased this product');
      }

      // Iterate through each element in `product.feedbackDetails` and extract the rating
      const ratings: number[] = [...product.feedbackDetails.map((comment: { rating: number }) => Number(comment.rating)), rating]


      // If there are any ratings in the `ratings` array, calculate the average
      let avgRating = 0;
      if (ratings.length > 0) {
        avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      }

      const reviewDetails = {
        rating: rating,
        feedbackMsg: review,
        customerId: user._id,
        customerName: user.name,
      };

      const result = await this.productDb.findOneAndUpdate(
        { _id: productId },
        {
          $set: { avgRating }, // to set new avg rating
          $push: { feedbackDetails: reviewDetails } // to push a new element to feedbackDetails array
        },
      );

      return {
        message: 'Product review added successfully',
        success: true,
        result: {
          product: result
        },
      };
    } catch (error) {
      throw error;
    }
  }


  async removeProductReview(productId: string,
    reviewId: string): Promise<{
      message: string,
      success: boolean,
      result: {
        product: Products
      },
    }> {
    try {
      const product = await this.productDb.findById(productId);
      if (!product) {
        throw new Error('Product does not exist');
      }

      const review = product.feedbackDetails.find(
        (review) => review._id == reviewId,
      );
      if (!review) {
        throw new Error('Review does not exist');
      }

      const ratings: any[] = []; // push all rating to ratings expect my review rating
      product.feedbackDetails.forEach((comment) => {
        if (comment._id.toString() !== reviewId) {
          ratings.push(comment.rating);
        }
      });

      let avgRating = '0';
      if (ratings.length > 0) {
        avgRating = (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(
          2,
        );
      }

      const result = await this.productDb.findOneAndUpdate(
        { _id: productId },
        {
          $set: { avgRating }, // set new average after pulling my review
          $pull: { feedbackDetails: { _id: reviewId } } // pull review from array
        },
      );

      return {
        message: 'Product review removed successfully',
        success: true,
        result: {
          product: result
        },
      };
    } catch (error) {
      throw error;
    }
  }


  async getProductSkuData(productSkus: { productId: string, skuId: string }[]): Promise<{
    result: wishlistItems,
    message: string,
    success: boolean
  }> {
    const wishlist = await this.productDb.getWishlistItems(productSkus)


    return {
      message: 'wishlist fetched successfully',
      result: wishlist,
      success: true
    }
  }
}
