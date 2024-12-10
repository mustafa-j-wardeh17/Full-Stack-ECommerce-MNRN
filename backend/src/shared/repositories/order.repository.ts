import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Orders } from "../schema/order";
import { Document, Model } from "mongoose";


@Injectable()
export class OrdersRepository {
    constructor(
        @InjectModel(Orders.name) private readonly orderModel: Model<Orders>,
    ) { }
}