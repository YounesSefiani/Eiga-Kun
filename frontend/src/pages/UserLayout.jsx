import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./UserLayout.css"; // Assurez-vous que ce chemin est correct
import { AuthContext } from "../components/context/AuthContext";

function UserLayout() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/user/profil");
    }
  }, [user, token, navigate]);

  return (
    <div className="user-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
