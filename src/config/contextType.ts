







export interface Props {
  children: React.ReactNode;
}

// Auth Provider
export interface IAuth {
  provider: string;
  providerId: string;
}

// Geo Location (MongoDB GeoJSON)
export interface IGeoLocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

// User Model
export interface IUser {
  _id: string;
  displayName: string;
  email: string;
  image: string;

  role: "ADMIN" | "USER";

  bio?: string;

  location: IGeoLocation;
  lat: number;
  long: number;
  userLocation: string;

  age: number;

  // Availability
  availableForDate: boolean;
  availableForDance: boolean;
  availableForFriend: boolean;

  // Notifications
  newMatchesNotification: boolean;
  messageAlertsNotification: boolean;
  eventRemindersNotification: boolean;

  // Status
  isVerified: boolean;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";

  // Relations
  interests: string[];
  auths: IAuth[];

  // Optional
  fcmToken?: string | null;

  createdAt: string;
  updatedAt: string;
}

// Auth Response
export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
  };
}

export interface IGetMeResponse {
  success: boolean;
  message: string;
  data: IUser;
}

export interface IValue {
  user: IUser | null;
  refetchUser: () => void;
  loading: boolean;
}