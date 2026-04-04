import sequreApi from "../../axios/axiosSequre"



export const topFiveEvents = async () => {
    try {
        const { data } = await sequreApi.get(
            `/event/top-five-events?fields=-location,-tags,-description,-lat,-long,-createdAt,-updatedAt,-start_date_time,-end_date_time,-openDoor,-isDelete,-address,-lineupMember&limit=5`
        );

        return data?.data;
    } catch (error) {
        console.error("Error fetching top events:", error);
        throw error;
    }
};