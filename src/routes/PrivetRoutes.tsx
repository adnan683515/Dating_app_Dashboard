import { Navigate } from "react-router";
import AuthHook from "../Hooks/AuthHook";
import Loading from "../components/Loading";

type Props = {
  children: React.ReactNode;
};

const PrivetRoutes = ({ children }: Props) => {

  const { user, loading } = AuthHook();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children
};

export default PrivetRoutes;
