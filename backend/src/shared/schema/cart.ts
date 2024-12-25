import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Create the interface for the Cart document
export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart extends Document {


    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true })
    productName: string;

    @Prop({ type: String, required: true })
    skuKey: string;

    @Prop({ type: String, required: true })
    skuId: string;

    @Prop({ type: String, required: true })
    skuPriceId: string

    @Prop({ type: Number, required: true })
    quantity: number
}
export const CartSchema = SchemaFactory.createForClass(Cart);
