import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Products } from "../schema/products";
import { Document, Model } from "mongoose";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { UpdateProductDto } from "src/products/dto/update-product.dto";
import { ParsedOptions } from "qs-to-mongo/dist/query/options-to-mongo";


@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Products.name) private readonly productModel: Model<Products & Document>
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
        options.sort = options.sort || { _id: 1 };
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
}