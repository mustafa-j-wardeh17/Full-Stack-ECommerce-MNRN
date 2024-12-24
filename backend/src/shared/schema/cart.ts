import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Create the interface for the Cart document
export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart extends Document {
    @Prop({ type: String, required: true })
    product: string;

    @Prop({ type: String, required: true })
    sku: string;

    @Prop({ type: String, required: true })
    userId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
