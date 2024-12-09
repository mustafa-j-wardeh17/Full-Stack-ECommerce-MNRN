import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Products } from "../schema/products";
import { Model } from "mongoose";


@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Products.name) private readonly productDB: Model<Products>
    ) { }
}