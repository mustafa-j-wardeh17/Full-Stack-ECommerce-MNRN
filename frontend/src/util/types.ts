enum CategoryType {
    OperatingSystem = 'Operating System',
    ApplicationSoftware = 'Application Software',
}

enum PlatformType {
    Windows = 'Windows',
    Mac = 'Mac',
    Linux = 'Linux',
    Android = 'Android',
    IOS = 'iOS',
}

enum BaseType {
    Computer = 'Computer',
    Mobile = 'Mobile',
}

export type Feedbacker = {
    customerId: string;
    customerName: string;
    rating: number;
    feedbackMsg: string;
};

export type SkuDetail = {
    skuName: string;
    price: number;
    validity: number; // in days
    lifetime: boolean;
    stripePriceId: string;
    skuCode?: string;
};


export type Product = {
    _id: string;
    productName: string;
    description: string;
    image: string;
    category: CategoryType;
    platformType: PlatformType;
    baseType: BaseType;
    productUrl: string;
    downloadUrl: string;
    avgRating?: number;
    feedbackDetails: Feedbacker[];
    skuDetails: SkuDetail[];
    imageDetails?: Record<string, any>;
    requirementSpecification?: Record<string, any>[];
    highlights?: string[];
    stripeProductId: string;
};
