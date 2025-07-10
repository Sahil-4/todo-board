import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, fetchUser } = useAppContext();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/auth");
    }
  }, [isAuthenticated]);

  if (isAuthenticated === true) {
    return <>{children}</>;
  }

  return null;
}
