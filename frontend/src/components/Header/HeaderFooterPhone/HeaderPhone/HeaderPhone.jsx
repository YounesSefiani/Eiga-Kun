import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../../services/UserContext/AuthContext";
import EigaKunLogo from '../../../../assets/EigaKunLogo.png'
import "./HeaderPhone.css"

function HeaderPhone() {
  const {user, token} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="headerPhone">
      <Link to ="/">
        <img src={EigaKunLogo} alt="Eiga-Kun Logo"/>
      </Link>
        <input type="text" placeholder="Rechercher..."/>
        {user && token ? (
          <button onClick={() => navigate(`/user/${token}`)}>
            {user.username}
          </button>
        ) : (
          <button onClick={() => navigate("/auth")}>Se connecter</button>
        )}
    </div>
    )
}

export default HeaderPhone;