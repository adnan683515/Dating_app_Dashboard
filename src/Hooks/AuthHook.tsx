import { useContext } from "react"
import { Authcontext } from "../context/AuthContext"

export default function AuthHook() {


    const contextValue = useContext(Authcontext)


    return contextValue
}
