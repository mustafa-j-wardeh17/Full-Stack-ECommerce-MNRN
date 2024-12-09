import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Products } from "../schema/products";
import { Document, Model } from "mongoose";
import { CreateProductDto } from "src/products/dto/create-product.dto";


@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Products.name) private readonly productModel: Model<Products & Document>
    ) { }

    async create(product: CreateProductDto) {
        const createdProduct = await this.productModel.create(product)
        return createdProduct
    }
}