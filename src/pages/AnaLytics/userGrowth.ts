



// /admin/analytics/user-growth

import sequreApi from "../../axios/axiosSequre"

export const getUserGrowth = async (by: string) => {

    const res = await sequreApi.get(`/admin/analytics/user-growth?range=${by}`)

    return res?.data?.data
}