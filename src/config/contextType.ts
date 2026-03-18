







export interface Props {
  children: React.ReactNode;
}



export interface IAuths {
  provider: string;
  providerId: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  badge: boolean;
  isActive: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  auths: IAuths[];
  createdAt: string;
  updatedAt: string;
  verifiedBadge?: string | null;
  verifiedBadgeExpiration?: string | null;
  bio?: string;
  location?: string;
  avatar?: string;
  followingCount: number;
  followerCount: number;
  listingCount: number;
}

export interface IValue {
  user: IUser | null;
  refetchUser: () => void;
  loading: boolean;
}