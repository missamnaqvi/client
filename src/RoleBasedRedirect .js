import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      switch (user.role) {
        case "pg_owner":
          navigate("/pg_owner");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "pg-manager":
          navigate("/pg-manager");
          break;
        case "resident":
          navigate("/resident");
          break;
        default:
          navigate("/unauthorized");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null; // This component handles redirection only
};

export default RoleBasedRedirect;
