import { InjectModel } from "@nestjs/mongoose";
import { Injectable, BadRequestException, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { Subscriber } from "../schema/subscriber";
import { MailerService } from "src/middleware/mailer";

@Injectable()
export class SubscriberRepository {
    constructor(
        @InjectModel(Subscriber.name)
        private readonly subscriberModel: Model<Subscriber>,
        @Inject(MailerService) private readonly mailer: MailerService

    ) { }

    // Add a new subscriber
    async addSubscriber(email: string): Promise<Subscriber> {
        try {
            const newSubscriber = new this.subscriberModel({ email });
            return await newSubscriber.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException("Email already exists.");
            }
            throw error;
        }
    }
    async deleteEmailSubscriber(email: string): Promise<boolean> {
        const result = await this.subscriberModel.deleteOne({ email }).exec();
        console.log('Delete operation result:', result);
        return result.deletedCount > 0; // Return true if deletion occurred
    }

    async getSubscriberByEmail(email: string): Promise<Subscriber | null> {
        return this.subscriberModel.findOne({ email }).exec();
    }
    
    async getAllSubscribers(): Promise<Subscriber[]> {
        return this.subscriberModel.find().exec();
    }





    async sendNotificationToSubscriber(email: string, message: string): Promise<void> {
        const subscriber = await this.getSubscriberByEmail(email);
        if (!subscriber) {
            throw new BadRequestException("Subscriber not found.");
        }

        console.log(`Notification sent to ${subscriber.email}: ${message}`);
    }

    async sendNotificationToAll(message: string): Promise<void> {
        const subscribers = await this.getAllSubscribers();
        if (subscribers.length === 0) {
            console.log("No subscribers to notify.");
            return;
        }

        subscribers.forEach((subscriber) => {
            console.log(`Notification sent to ${subscriber.email}: ${message}`);
        });

    }
}
