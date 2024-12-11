import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseInterceptors, UploadedFile, Put, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/middleware/role.decorator';
import { userTypes } from 'src/shared/schema/users';
import { GetProductQueryDto } from './dto/get-product-query-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import config from 'config';
import { ProductSkuDto, ProductSkuDtoArr } from './dto/product-sku.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @HttpCode(201)
  @Roles(userTypes.ADMIN)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.createProduct(createProductDto);
  }
  @Patch(':id')
  @Roles(userTypes.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto
  ) {
    return await this.productsService.updateProduct(id, UpdateProductDto);
  }

  @Get()
  async findAll(@Query() query: GetProductQueryDto) {
    return await this.productsService.findAllProducts(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post(':id/image')
  @Roles(userTypes.ADMIN)
  @UseInterceptors(// to upload files
    FileInterceptor('productImage', {
      dest: config.get('fileStoragePath'),
      limits: {
        fileSize: 3145728,// 3MB
      }
    })
  )
  async uploadProductImage(
    @Param('id') id: string,
    @UploadedFile() file: ParameterDecorator
  ) {
    return await this.productsService.uploadProductImage(id, file)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post(':productId/skus')
  @Roles(userTypes.ADMIN)
  async updateProductSku(
    @Param('productId') productId: string,
    @Body() updateProductSkuDto: ProductSkuDtoArr
  ) {
    return await this.productsService.updateProductSku(productId, updateProductSkuDto)
  }

  @Put(':productId/skus/:skuId')
  @Roles(userTypes.ADMIN)
  async updateProductSkuById(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
    @Body() updateProductSkuDto: ProductSkuDto,
  ) {
    return await this.productsService.updateProductSkuById(
      productId,
      skuId,
      updateProductSkuDto,
    );
  }

  @Post(':productId/skus/:skuId/license')
  @Roles(userTypes.ADMIN)
  async addProductLicense(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
    @Body('licenseKey') licenseKey: string
  ) {
    return await this.productsService.addProductSkuLicense(
      productId,
      skuId,
      licenseKey
    )
  }

  @Delete('licenses/:licenseKeyId')
  @Roles(userTypes.ADMIN)
  async deleteProductLicense(
    @Param('licenseKeyId') licenseId: string
  ) {
    return await this.productsService.removeProductSkuLicense(
      licenseId
    )
  }

  @Get(':productId/skus/:skuId/licenses')
  @Roles(userTypes.ADMIN)
  async getProductSkuLicenses(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string) {
    return await this.productsService.getProductSkuLicenses(
      productId,
      skuId
    )
  }

  @Put('/:productId/skus/:skuId/licenses/:licenseKeyId')
  @Roles(userTypes.ADMIN)
  async updateProductSkuLicense(
    @Param('productId') productId: string,
    @Param('skuId') skuId: string,
    @Param('licenseKeyId') licenseKeyId: string,
    @Body('licenseKey') licenseKey: string,
  ) {
    return await this.productsService.updateProductSkuLicense(
      productId,
      skuId,
      licenseKeyId,
      licenseKey,
    );
  }

  @Post('/:productId/reviews')
  @Roles(userTypes.CUSTOMER)
  async addProductReview(
    @Param('productId') productId: string,
    @Body('rating') rating: number,
    @Body('review') review: string,
    @Req() req: any,
  ) {
    return await this.productsService.addProductReview(
      productId,
      rating,
      review,
      req.user,
    );
  }

  @Delete('/:productId/reviews/:reviewId')
  async removeProductReview(
    @Param('productId') productId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.productsService.removeProductReview(productId, reviewId);
  }
}
