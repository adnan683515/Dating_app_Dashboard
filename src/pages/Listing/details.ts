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


export const fetchEvent = async (id: string) => {
  const res = await sequreApi.get(`/event/get-event-details/${id}`);
  return res.data.data;
};

export const getLineUpofEvent = async (id: string) => {

  const res = await sequreApi.get(`/lineup/lineup-data?eventId=${id}&fields=-isDelete,-eventId`);
  return res.data.data;
}


export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const getStatus = (status: string) => {
  if (status === "NOSTART") return "No Start";
  if (status === "ONGOING") return "Ongoing";
  if (status === "ENDED") return "Ended";
  return status;
};


export const attendanceEvent = async (page: number, eventId: string) => {

  const response = await sequreApi.get(`/booking/get-all-joined-member/${eventId}?fields=-eventId&page=${page}`)

  return response.data.data;
}