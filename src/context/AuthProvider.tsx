import { useQuery } from "@tanstack/react-query";
import React from "react";
import sequreApi from "../axios/axiosSequre";
import type { IGetMeResponse, IValue } from "../config/contextType";
import { Authcontext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {


  const { data, isLoading, refetch } = useQuery<IGetMeResponse>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await sequreApi.get("/user/getMe");
      return res.data?.data;
    },
    staleTime: 1000 * 60 * 5, // 5 মিনিট cache
    retry: false,
  });



  const value: IValue = {
    user: data
      ? {
        data: data.data,
        connected: data.connected,
        requestSend: data.requestSend,
      }
      : null,
    refetchUser: refetch,
    loading: isLoading,
  };

  return (
    <Authcontext.Provider value={value}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;