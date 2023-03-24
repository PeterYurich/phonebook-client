import css from './AuthMenu.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuth } from 'redux/selectors';
import { logout } from 'redux/auth/authOperations';

import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavbarAuth() {
  const authData = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(authData.token));
    dispatch({
      type: 'contacts/fetchAll/rejected',
      payload: {
        items: [],
        isLoading: false,
        error: null,
      },
    });
  };

  return (
    <div className={css.auth}>
      {!authData.isLoggedIn ? (
        <div className={css.auth}>
          <Button onClick={() => navigate('/login')}>Log in</Button>
          <Button onClick={() => navigate('/signup')}>Sign up</Button>
        </div>
      ) : (
        <div className={css.logedUser}>
          <Typography className={css.helloing}>
            Hello, {authData.user.name}
          </Typography>
          <Button onClick={handleLogout} className={css.authLink}>
            Log out
          </Button>
        </div>
      )}
    </div>
  );
}
