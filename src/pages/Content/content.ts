/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import sequreApi from "../../axios/axiosSequre";
import type { PaymentStatus } from "../../config/type";
import type { EventsMeta } from "../Listing/getAllEvents";


interface User {
    _id: string;
    displayName: string;
    image: string;
}

interface Event {
    _id: string;
    title: string;
    image: string;
}



interface Ticket {
    _id: string;
    userId: User;
    eventId: Event;
    ticketCount: number;
    fee: number;
    paymentStatus: string;
    txId: string;
    createdAt: string; // or Date
    updatedAt: string; // or Date
    useCount: string;
}

interface TickesData {
    data: Ticket[];
    meta: EventsMeta;
}




// API fetch function
const fetchBookings = async (params: { page?: number; limit?: number; paymentStatus?: string; }): Promise<TickesData> => {
    // Remove undefined keys
    const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    );

    const res = await sequreApi.get('/booking/get-all-bookingList', { params: cleanedParams });
    return res?.data?.data; // or res.data.data depending on your API
};


export const useBookings = (params: { page?: number; limit?: number; paymentStatus?: string; }) => {

    return useQuery<TickesData>({
        queryKey: ['events', params],
        queryFn: () => fetchBookings(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};


interface BookingInterface {
    useCount?: number
}

export const upDateTicket = async (
    body: BookingInterface,
    id: string
) => {
    try {
        const res = await sequreApi.patch(`/booking/update-book-useCount/${id}`,body);

        return res.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Update Ticket Error:", error?.response?.data || error.message);

        return {
            success: false,
            message: error?.response?.data?.message || "Something went wrong",
        };
    }
};