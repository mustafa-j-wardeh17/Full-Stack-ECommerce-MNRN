import { baseType, categoryType, platformType } from "./constant";

export interface HttpResponse {
    message: string;
    path: string;
    result: any;
    statusCode: number;
    success: boolean;
    timeStamp: string;
}
export interface ProductResponse extends HttpResponse {
    result: {
        relatedProducts: Product[];
        product: Product;
    };
}

export interface ProductsResponse extends HttpResponse {
    result: {
        metadata: {
            limit: number,
            total: number,
            pages: number,
        };
        products: Product[];
    };
}
export interface GetProductSkuLicensesResponse extends HttpResponse {
    result: {
        licenses: License[];
    };
}

export interface GetCartItemsResponse extends HttpResponse {
    result: {
        cart: Cart[]
    }
}
export interface PostCartItemResponse extends HttpResponse {
    result: Cart

}

export interface UpdateCartItemResponse extends HttpResponse {
    result: Cart
}
export interface CheckoutSelectedCartItemResponse extends HttpResponse {
    result: string
}





export type Cart = {
    _id: string;
    userId: string;
    productName: string;
    productId: string;
    skuPrice: number;
    skuKey: string;
    skuId: string;
    skuPriceId: string;
    quantity: number;
    productImage: string
}
export type License = {
    _id: string;
    isSold: boolean;
    licenseKey: string;
    orderId: string;
    product: string;
    productSku: string
}
export type Feedbacker = {
    _id: string;
    customerId: string;
    customerName: string;
    rating: number;
    feedbackMsg: string;
};

export type SkuDetail = {
    _id: string;
    skuName: string;
    price: number;
    validity: number; // in days
    lifetime: boolean;
    stripePriceId: string;
    skuCode?: string;
    remainingStock: number
};


export type Product = {
    _id: string;
    productName: string;
    description: string;
    image: string;
    category: categoryType;
    platformType: platformType;
    baseType: baseType;
    productUrl: string;
    downloadUrl: string;
    avgRating?: number;
    feedbackDetails: Feedbacker[];
    skuDetails: SkuDetail[];
    imageDetails?: Record<string, any>;
    requirementSpecification?: Record<string, any>[];
    highlights?: string[];
    stripeProductId: string;
    hasLicenses: boolean
};



export interface Order {
    _id: string;
    orderId: string;
    userId: string;
    customerAddress: {
        city: string;
        country: string;
        line1: string;
        line2: string | null;
        postal_code: string | null;
        state: string | null;
    };
    customerPhoneNumber: string;
    orderedItems: {
        lifetime: string;
        price: string;
        productId: string;
        productImage: string;
        productName: string;
        skuCode: string;
        quantity: string;
        licenses: string[];
    }[];
    paymentInfo: {
        paymentMethod: string;
        paymentIntentId: string;
        paymentDate: string;
        paymentAmount: number;
        paymentStatus: string;
    };
    orderStatus: string;
    isOrderDelivered: boolean;
    checkoutSessionId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

