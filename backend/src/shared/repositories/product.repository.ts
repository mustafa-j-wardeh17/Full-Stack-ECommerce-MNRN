import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Products } from "../schema/products";
import { Document, Model } from "mongoose";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { ParsedOptions } from "qs-to-mongo/dist/query/options-to-mongo";
import { License } from "../schema/license";

export interface wishlistItems {
    wishlist: {
        productName: string,
        productImage: string;
        productId: string;
        skuKey: string;
        skuId: string;
        skuPrice: number;
        skuPriceId: string
        quantity: number
    }[]
}

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Products.name) private readonly productModel: Model<Products & Document>,
        @InjectModel(License.name) private readonly licenseModel: Model<License & Document>,
    ) { }

    async create(product: CreateProductDto) {
        const createdProduct = await this.productModel.create(product)
        return createdProduct
    }
    async findById(id: string) {
        return await this.productModel.findById(id)
    }
    async findOneAndUpdate(query: any, update: any) {
        const product = await this.productModel.findOneAndUpdate(query, update, {
            new: true,
        });
        return product;
    }

    async findByIdAndDelete(id: string) {
        return await this.productModel.findByIdAndDelete(id)
    }

    async findProductWithGroupBy() {
        const products = await this.productModel.aggregate([
            {
                // The $facet stage allows multiple pipelines to be executed independently, 
                // producing multiple outputs in a single query.
                // will give latest 4 product and the top 8 products in rating
                $facet: {
                    latestProducts: [{ $sort: { createdAt: -1 } }, { $limit: 4 }],
                    topRatedProducts: [{ $sort: { avgRating: -1 } }, { $limit: 8 }],
                },
            },
        ]);
        return products;
    }

    async find(query: Record<string, any>, options: ParsedOptions) {
        options.sort = options.sort || { _id: 1 }; // propery name like sort=-productName for desc and sort=productName for asc sorting
        options.limit = options.limit || 12;
        options.skip = options.skip || 0;

        if (query.search) {
            query.productName = new RegExp(query.search, 'i');
            delete query.search;
        }

        const products = await this.productModel.aggregate([
            {
                $match: query,
            },
            {
                $sort: options.sort,
            },
            { $skip: options.skip },
            { $limit: options.limit },
        ]);

        const totalProductCount = await this.productModel.countDocuments(query);
        return { totalProductCount, products };
    }

    async findRelatedProducts(query: Record<string, any>) {


        const products = await this.productModel.aggregate([
            {
                $match: query,
            },
            { $sample: { size: 4 } },
        ]);

        return products;
    }

    async findLicenseById(licenseId: string) {


        const license = await this.licenseModel.findById(licenseId)

        return license;
    }
    async createLicenses(productId: string,
        skuId: string,
        licenseKeys: string[]) {


        const createdLicenses = licenseKeys.map(licenseKey => ({
            product: productId,
            productSku: skuId,
            licenseKey
        }))
        const license = await this.licenseModel.create(createdLicenses)

        return license;
    }

    async removeLicense(licenseId: string) {


        const license = await this.licenseModel.findByIdAndDelete(licenseId)

        return license;
    }

    async findLicenses(query: any, limit?: number) {
        if (limit && limit > 0) {
            const license = await this.licenseModel.find(query).limit(limit);
            return license;
        }
        const license = await this.licenseModel.find(query);
        return license;
    }

    async updateLicense(query: any, update: any) {
        const license = await this.licenseModel.findOneAndUpdate(query, update, {
            new: true,
        });
        return license;
    }

    async updateLicenseMany(query: any, data: any) {
        const license = await this.licenseModel.updateMany(query, data);
        return license;
    }

    async deleteSku(id: string, skuId: string) {
        return await this.productModel.updateOne(
            { _id: id },
            {
                $pull: {
                    skuDetails: { _id: skuId },
                },
            },
        );
    }

    async incrementSkuRemainingStock(productId: string, skuId: string, qty?: number): Promise<void> {
        await this.productModel.updateOne(
            { _id: productId, 'skuDetails._id': skuId },
            { $inc: { 'skuDetails.$.remainingStock': qty ? qty : 1 } },
        );
    }
    async decrementSkuRemainingStock(productId: string, skuId: string, quantity?: number): Promise<void> {
        await this.productModel.updateOne(
            { _id: productId, 'skuDetails._id': skuId },
            { $inc: { 'skuDetails.$.remainingStock': quantity ? -quantity : -1 } },
        );
    }

    async deleteAllLicences(productId: string, skuId: string) {
        if (productId)
            return await this.licenseModel.deleteMany({ product: productId });
        return await this.licenseModel.deleteMany({ productSku: skuId });
    }

    async getWishlistItems(wishlist: { productId: string; skuId: string }[]): Promise<wishlistItems> {
        // Extract product IDs from the wishlist
        const productIds = wishlist.map(item => item.productId);

        // Query products based on product IDs
        const products = await this.productModel.find({ _id: { $in: productIds } }).exec();

        if (!products || products.length === 0) {
            console.warn('No matching products found for the provided product IDs.');
            return { wishlist: [] };
        }

        // Map products to the required wishlistItems structure
        const wishlistProducts = wishlist.map(({ productId, skuId }) => {
            const product = products.find(p => p._id.toString() === productId);

            if (!product) {
                return null;
            }

            const skuDetail = product.skuDetails.find(sku => sku._id.toString() === skuId);

            if (!skuDetail) {
                return null;
            }

            return {
                productName: product.productName,
                productImage: product.image,
                productId: product._id.toString(),
                skuKey: skuDetail.skuName,
                skuId: skuDetail._id.toString(),
                skuPrice: skuDetail.price,
                skuPriceId: skuDetail.stripePriceId,
                quantity: 1,
            };
        }).filter(Boolean);

        return { wishlist: wishlistProducts };
    }

}