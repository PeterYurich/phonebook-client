import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectContacts,
  visibleContacts,
  selectContactsStatus,
} from 'redux/selectors';
import {
  deleteContact,
  fetchContacts,
} from 'redux/contacts/contactsOperations';

import css from './ContactList.module.scss';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Typography } from '@mui/material';

import { Notify } from 'notiflix';

import LoaderBlock from 'components/Loaders/LoaderBlock';
import { RingLoader } from 'react-spinners';

const ContactList = () => {
  const dispatch = useDispatch();
  const contactsStatus = useSelector(selectContactsStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(selectContacts);
  const handleDelete = (id, name) => {
    dispatch(deleteContact(id));
    Notify.info(`${name} is deleted from you phonebook successfully!`);
  };

  const toRender = useSelector(visibleContacts);

  return (
    <ul>
      {contactsStatus === 'fetching' && <LoaderBlock />}
      {/* {contacts.error && <div>Oops! A mistake is happend. Try again!</div>} */}
      {!contacts.isLoading &&
        toRender.map(person => {
          return (
            <li className={css.contact} key={person._id}>
              <Typography
                sx={{
                  width: '300px',
                }}
              >
                {person.name}: {person.phone}
              </Typography>

              {contactsStatus === person._id ? (
                <RingLoader size={32} />
              ) : (
                <IconButton
                  sx={{ visibility: 'none' }}
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(person._id, person.name)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              )}
            </li>
          );
        })}
    </ul>
  );
};
export default ContactList;
