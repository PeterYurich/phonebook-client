import React from 'react';
import NavbarAuth from '../Auth/AuthMenu';
import { ContactPhone } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import css from './Header.module.scss';

function Header() {
  const navigate = useNavigate();
  return (
    <div className={css.header_container}>
      <div className={css.Header}>
        <div className={css.logo}>
          <Button
            // className={css.link}
            onClick={() => navigate('/contacts')}
          >
            <ContactPhone 
            style = {{margin: "5px"}}
             color="primary" size="large" /> My phonebook
          </Button>
        </div>
        <NavbarAuth></NavbarAuth>
      </div>
    </div>
  );
}

export default Header;
