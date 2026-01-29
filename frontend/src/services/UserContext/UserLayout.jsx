import React, { useContext, useEffect } from "react";
import AuthContext from "../UserContext/AuthContext";
import { useNavigate } from "react-router-dom";

function UserLayout({ children }) {
  const { user, token, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || !token)) {
      navigate("/auth");
    }
  }, [user, token, isLoading, navigate]);

  if (isLoading) return null; // ou un loader si tu veux

  return <>{children}</>;
}

export default UserLayout;