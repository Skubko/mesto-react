import React from 'react';
import vector from '../images/vector.svg';

function Header() {
  return (
      <header className="header">
            <img src={vector} alt="Место Россия" className="header__logo" />
        </header>
        );
}
  
export default Header;