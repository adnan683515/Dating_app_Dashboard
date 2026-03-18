import sequreApi from "../../axios/axiosSequre";

export interface SellerAuth {
    provider: string;
    providerId: string;
}

export interface Seller {
    _id: string;
    fullName: string;
    email: string;
    badge: boolean;
    isActive: "ACTIVE" | "INACTIVE";
    isDeleted: boolean;
    isVerified: boolean;
    role: "USER" | "ADMIN" | string;
    auths: SellerAuth[];
    createdAt: string;
    updatedAt: string;
}

export interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    location: string;
    sold: boolean;
    sellerId: string;
    isBoosted: boolean;
    viewCount: number;
    inquiryCount: number;
    year: number;
    mileage: number;
    trans: string;
    color: string;
    imagesAndVideos: string[]; // array of URLs
    createdAt: string;
    updatedAt: string;
    seller: Seller;
    isBookmarked: boolean;
    __v?: number;
}

export interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ListingsResponse {
    data: Listing[];
    meta: Meta;
}

export const fetchListings = async (page: number, limit: number = 10): Promise<ListingsResponse> => {
    const response = await sequreApi.get(`/listings?page=${page}&limit=${limit}`);

    return {
        data: response.data.data,   // array of listings
        meta: response.data.meta    // pagination info
    };
};


















