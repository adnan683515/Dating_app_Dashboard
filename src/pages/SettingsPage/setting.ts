



import sequreApi from "../../axios/axiosSequre";

export const uploadProfile = async ({ file, displayName, id }: { file: File | ""; displayName: string; id: string }) => {
    const formData = new FormData();

    if (file) {
        formData.append("file", file);
    }

    if (displayName) {
        formData.append("displayName", displayName);
    }

    const response = await sequreApi.patch(`/user/updateuser/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", },
    })

    return response.data;
};