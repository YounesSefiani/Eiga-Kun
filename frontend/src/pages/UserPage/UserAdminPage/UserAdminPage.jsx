import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import HeaderPhone from '../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone';
import FooterPhone from '../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone';
import UserAdminMoviesPage from './UserAdminMoviesPage/UserAdminMoviesPage';
import { AuthContext } from '../../../services/UserContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./UserAdminPage.css";

function UserAdminPage() {
    const { user, token, handleAuthError} = useContext(AuthContext);
    const [adminView, setAdminView] = useState("admin");
    const navigate = useNavigate();

    useEffect(() => {
        if ((!user || !token) && user?.role !== 'admin') {
            handleAuthError();
            navigate('/');
        }
    }, [user, token, navigate, handleAuthError]);


  return (
    <div className="userAdminPage">
        <Header />
        <HeaderPhone />
        <div className="userAdminContent">
        <div className="userAdminBar">
            <div className="userAdminHeader">
                <div className="userAdminAvatar">
                {user && user.avatar ? (
                    <img src={user.avatar && user.avatar.startsWith("http")
                    ? user.avatar
                    : user.avatar
                    ? `http://localhost:3994/src/assets/Users/Avatars/${user.avatar}`
                    : ""} alt={user.username} />
                ) : (
                    <FontAwesomeIcon icon={faUser} />
                )}
                </div>
                <p>{user.username}</p>
            </div>
            <div className="userAdminSections">
                <button onClick={() => navigate(`/user/${token}`)}>Ma page</button>
                <button onClick={() => setAdminView("admin_movies")}>Les films</button>
                <button>Les séries</button>
                <button>Les personnalités</button>
            </div>
            <button type="button">Deconnexion</button>
        </div>
        {adminView === "admin" &&        
        <div className="userAdminProfile"></div>
        }
        {adminView === "admin_movies" &&        
        <UserAdminMoviesPage setAdminView={setAdminView} />
        }
        </div>
        <FooterPhone />
    </div>
  )
}

export default UserAdminPage;