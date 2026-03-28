import sequreApi from "../../axios/axiosSequre"




export const userGetData = async (page: number, limit: number, status?: string, searchTerm?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {
        fields:
            '-auths,-fcmToken,-isVerified,-location,-createdAt,-updatedAt,-password,-newMatchesNotification,-messageAlertsNotification,-eventRemindersNotification',
        limit: limit || 10,
        page: page || 1,
    };

    // status থাকলে add হবে
    if (status !== "All") {
        params.status = status;
    }

    if (searchTerm) {
        params.searchTerm = searchTerm
    }

    const res = await sequreApi.get('/user/users', { params });

    return res?.data?.data;
};


export const updateUser = async (userId: string, status: string) => {
    try {
        const res = await sequreApi.patch(`/user/updateuser/${userId}`, { status });

        return {
            success: true,
            data: res?.data,
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Something went wrong",
        };
    }
};






export type Role = "USER" | "ADMIN";
export type Status = "ACTIVE" | "INACTIVE";

export interface Interest {
  _id: string;
  name: string;
}

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface AuthProvider {
  provider: string;
  providerId: string;
}

export interface UserType {
  _id: string;

  displayName: string;
  fullName: string;

  email: string;
  password?: string; // optional (not send in response ideally)

  image: string;

  role: Role;
  status: Status;

  age: number;
  bio: string;

  availableForDate: boolean;
  availableForDance: boolean;
  availableForFriend: boolean;

  newMatchesNotification: boolean;
  messageAlertsNotification: boolean;
  eventRemindersNotification: boolean;

  isVerified: boolean;

  lat: number | null;
  long: number | null;
  userLocation: string | null;

  interests: Interest[];

  location: Location;

  fcmToken?: string;

  auths: AuthProvider[];

  createdAt: string;
  updatedAt: string;
}


