import React from 'react'
import EigaKunLogo from '../../../../assets/EigaKunLogo.png'
import "./HeaderPhone.css"
import { Link } from 'react-router-dom';

function HeaderPhone() {
  return (
    <div className="headerPhone">
      <Link to ="/">
        <img src={EigaKunLogo} alt="Eiga-Kun Logo"/>
      </Link>
        <input type="text" placeholder="Rechercher..."/>
        <button>Se connecter</button>
    </div>
    )
}

export default HeaderPhone;