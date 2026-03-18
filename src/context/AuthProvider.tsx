import { useQuery } from "@tanstack/react-query";
import { Authcontext } from "./AuthContext";
import type { IValue, IUser } from "../config/contextType";
import React from "react";
import sequreApi from "../axios/axiosSequre";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {


  const { data, isLoading, refetch } = useQuery<IUser>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await sequreApi.get("/users/get_me"); 
      return res.data.data; 
    },
    staleTime: 1000 * 60 * 5, // 5 মিনিট cache
    retry: false,
  });



  const value: IValue = {
    user: data || null,
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