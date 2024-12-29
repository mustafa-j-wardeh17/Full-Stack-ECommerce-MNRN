import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum categoryType {
  OperatingSystem = 'Operating System',
  ApplicationSoftware = 'Application Software',
  HardwareComponent = 'Hardware Component',
  MobileAccessory = 'Mobile Accessory',
  ComputerAccessory = 'Computer Accessory',
  PeripheralDevice = 'Peripheral Device',
  DisplayDevice = 'Display Device',
  PaidSoftware = 'Paid Software',
  DigitalLicense = 'Digital License',
  StorageDevice = 'Storage Device',
  NetworkingDevice = 'Networking Device',
  GamingDevice = 'Gaming Device',
  CoolingSolution = 'Cooling Solution',
  PowerSupply = 'Power Supply',
  InputDevice = 'Input Device',
  SmartHomeDevice = 'Smart Home Device',
  Smartphone = 'Smartphone',
  Tablet = 'Tablet',
  WearableDevice = 'Wearable Device',
  VirtualReality = 'Virtual Reality',
  AugmentedReality = 'Augmented Reality',
  AntivirusSoftware = 'Antivirus Software',
  GraphicsCard = 'Graphics Card',
  Processor = 'Processor',
  Motherboard = 'Motherboard',
  RAM = 'RAM',
  ExternalStorage = 'External Storage',
  BatteryBackup = 'Battery Backup',
  Cable = 'Cable',
  GamingChair = 'Gaming Chair',
  Printer = 'Printer',
  Keyboard = 'Keyboard',
  Mouse = 'Mouse',
  Speaker = 'Speaker',
  Headphones = 'Headphones',
  Monitor = 'Monitor',
  Laptop = 'Laptop',
  Headset='Headset'
}

export enum platformType {
  Windows = 'Windows',
  Mac = 'Mac',
  Linux = 'Linux',
  Android = 'Android',
  IOS = 'iOS',
  CrossPlatform = 'Cross Platform',
  PlayStation = 'PlayStation',
  Xbox = 'Xbox',
  SmartTV = 'Smart TV',
  WebBased = 'Web Based',
  IoT = 'IoT',
  Cloud = 'Cloud',
  ChromeOS = 'ChromeOS',
  Unix = 'Unix',
  VRPlatform = 'VR Platform',
  ARPlatform = 'AR Platform',
  Universal = 'Universal',
  None='None'
}

export enum baseType {
  Computer = 'Computer',
  Mobile = 'Mobile',
  Tablet = 'Tablet',
  Wearable = 'Wearable',
  Peripheral = 'Peripheral',
  Software = 'Software',
  GamingConsole = 'Gaming Console',
  Accessory = 'Accessory',
  Networking = 'Networking',
  SmartHome = 'Smart Home',
  Storage = 'Storage',
  Cooling = 'Cooling',
  Display = 'Display',
  Audio = 'Audio',
  VirtualReality = 'Virtual Reality',
  AugmentedReality = 'Augmented Reality',
  Security = 'Security',
  Battery = 'Battery',
  IoTDevice = 'IoT Device',
  CloudService = 'Cloud Service',
  Furniture = 'Furniture',
  None='None'
}


@Schema({ timestamps: true })
export class Feedbackers extends mongoose.Document {
  @Prop({})
  customerId: string;

  @Prop({})
  customerName: string;

  @Prop({})
  rating: number;

  @Prop({})
  feedbackMsg: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedbackers);

@Schema({ timestamps: true })
export class SkuDetails extends mongoose.Document {
  @Prop({})
  skuName: string;

  @Prop({})
  price: number;

  @Prop({ required: false })
  validity?: number; // in days

  @Prop({ required: false })
  lifetime?: boolean;

  @Prop({})
  stripePriceId: string;

  @Prop({})
  skuCode?: string;

  @Prop({ default: 0, required: true })
  remainingStock: number
}

export const skuDetailsSchema = SchemaFactory.createForClass(SkuDetails);


@Schema({ timestamps: true })
export class Products {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    default:
      'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101027/112815900-no-image-available-icon-flat-vector.jpg?ver=6',
  })
  image?: string;

  @Prop({
    required: true,
    enum: categoryType,
  })
  category: string;

  @Prop({
    required: true,
    enum: platformType,
  })
  platformType: string;

  @Prop({ required: true, enum: baseType })
  baseType: string;

  @Prop({ required: true })
  productUrl: string;

  @Prop({ required: false })
  downloadUrl?: string;

  @Prop({})
  avgRating: number;

  @Prop([{ type: FeedbackSchema }])
  feedbackDetails: Feedbackers[];

  @Prop([{ type: skuDetailsSchema }])
  skuDetails: SkuDetails[];

  @Prop({ type: Object })
  imageDetails: Record<string, any>;

  @Prop({})
  requirementSpecification: Record<string, any>[];

  @Prop({})
  highlights: string[];

  @Prop({})
  stripeProductId: string;

  @Prop({ default: false, required: true })
  hasLicenses: boolean
}

export const ProductSchema = SchemaFactory.createForClass(Products);