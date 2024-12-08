import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum userTypes {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}

@Schema({
    timestamps: true
})
export class Users extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: userTypes })
    type: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ default: null })
    otp: string;

    @Prop({ default: null })
    otpExpiryTime: Date;

}

export const UserSchema = SchemaFactory.createForClass(Users);