import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../schema/users";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable() // to inject inside services
export class UserRepository {
    constructor(
        @InjectModel(Users.name)
        private readonly userModel: Model<Users>
    ) { }

    async findOne(query: any) {
        return await this.userModel.findOne(query)
    }

    async create(data: Record<string, any>) {
        return await this.userModel.create(data)
    }
    async updateOne(query: any, data: Record<string, any>) {
        return await this.userModel.updateOne(query, data)
    }

    async findMany(query: any) {
        return await this.userModel.find(query)
    }

    async findById(id: string) {
        return await this.userModel.findById(id)
    }
}