import sequreApi from "../../axios/axiosSequre"






export const fetchTopListings = async () => {
  const res = await sequreApi('/admin/analytics/top-listings')
  return res?.data?.data
}