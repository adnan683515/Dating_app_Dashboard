import { createContext } from "react";
import type { IValue } from "../config/contextType";

export const Authcontext = createContext<IValue>({
  user: null,
  refetchUser: () => {},
  loading: true,
});