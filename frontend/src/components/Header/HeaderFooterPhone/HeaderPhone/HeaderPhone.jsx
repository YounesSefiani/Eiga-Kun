import React from 'react'
import EigaKunLogo from '../../../../assets/EigaKunLogo.png'
import "./HeaderPhone.css"

function HeaderPhone() {
  return (
    <div className="headerPhone">
        <img src={EigaKunLogo} alt="Eiga-Kun Logo"/>
        <input type="text" placeholder="Rechercher..."/>
        <button>Se connecter</button>
    </div>
    )
}

export default HeaderPhone;