import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectContactsStatus,
  selectContactsError,
} from 'redux/selectors';
import { addContact } from 'redux/contacts/contactsOperations';

import { selectAuth } from 'redux/selectors';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ContactEmergencyOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Notify } from 'notiflix';
// import LoaderBlock from 'components/Loaders/LoaderBlock';
import { Blocks } from 'react-loader-spinner';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const contacts = useSelector(selectContacts);
  const contactsStatus = useSelector(selectContactsStatus);
  const error = useSelector(selectContactsError);

  const dispatch = useDispatch();
  const authData = useSelector(selectAuth);

  const inputController = evt => {
    const { name: inputName, value: inputValue } = evt.target;

    switch (inputName) {
      case 'name':
        setName(inputValue);
        break;
      case 'phone':
        setPhone(inputValue);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!authData.isLoggedIn) {
      alert(
        'Sign up to start creating your contact list or log in if you have your own account'
      );
    }
    if (
      contacts.find(person => person.name.toLowerCase() === name.toLowerCase())
    ) {
      alert(`A contact with the name "${name}" already exists!`);
      return;
    }
    if (name === '' || phone === '') {
      alert('Fill required fields, please!');
      return;
    }

    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // borderBottom: '2px solid grey',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ContactEmergencyOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a contact
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              // autoFocus
              onChange={inputController}
              value={name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone"
              type="phone"
              id="phone"
              name="phone"
              onChange={inputController}
              value={phone}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {contactsStatus === 'adding' ? (
                // <div>
                <Blocks height={25} />
              ) : (
                // </div>
                'save'
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ContactForm;
