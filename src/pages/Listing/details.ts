export interface ListingMedia {
  type: "image" | "video";
  url: string;
  _id: string;
}

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
  role: string;
  auths: SellerAuth[];
  createdAt: string;
  updatedAt: string;
  verifiedBadge?: string | null;
  verifiedBadgeExpiration?: string | null;
  bio?: string;
  location?: string;
  avatar?: string;
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  imagesAndVideos: ListingMedia[];
  category: string;
  condition: string;
  location: string;
  sold: boolean;
  sellerId: string;
  isBoosted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  viewCount: number;
  inquiryCount: number;
  color: string;
  mileage: number;
  trans: string;
  year: number;
  seller: Seller;
  isBookmarked: boolean;
}

export interface SingleListingResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Listing;
}


import sequreApi from "../../axios/axiosSequre";


export const fetchListingById = async (id: string): Promise<SingleListingResponse> => {
  const response = await sequreApi.get(`/listings/${id}`);
  return response.data;
};