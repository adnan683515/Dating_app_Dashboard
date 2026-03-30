import { useQuery } from '@tanstack/react-query';
import sequreApi from '../../axios/axiosSequre';

interface Event {
  _id: string;
  title: string;
  fee: number;
  user: string;
  category: { _id: string; name: string };
  start_date_time: string;
  end_date_time: string;
  venue: string;
  status: string;
  image: string;
  tags: string[];
  descripton: string;
  attendanceTotal: number;
  lat: number;
  long: number;
  addRess?: string;
  //   lineupMember: number;
}

interface EventsMeta {
  page: number;
  limit: number;
  total: number;
  totalpage: number;
}

interface EventsData {
  data: Event[];
  meta: EventsMeta;
}

// API fetch function
const fetchEvents = async (params: { page?: number; limit?: number; status?: string; tags?: string; filter?: string; }): Promise<EventsData> => {
  // Remove undefined keys
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
  );

  const res = await sequreApi.get('/event/getEventsForAdmin', { params: cleanedParams });
  console.log(res?.data?.data, "res")
  return res?.data?.data; // or res.data.data depending on your API
};


export const useEvents = (params: {
  page?: number;
  limit?: number;
  status?: string;
  tags?: string;
  filter?: string;
}) => {
  return useQuery<EventsData>({
    queryKey: ['events', params],
    queryFn: () => fetchEvents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};




// get event status count
export const eventStatusCount = async () => {

  const data = await sequreApi.get('/event/admin-events-status-count')

  return data?.data
}

// {{baseUrl}}/event/admin-events-status-count