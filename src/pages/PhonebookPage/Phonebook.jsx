import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import css from './PhonebookPage.module.scss'

import { Typography } from '@mui/material';

function Phonebook() {
  return (
    <div className={css.phonebook}>
      <div className={css.contactForm}>
        <ContactForm ></ContactForm>
      </div>

      <div className={css.contactsTitleLine}>
        <Filter ></Filter>
        <Typography component="h3" variant="h5">
          Contacts:
        </Typography>
      </div>
      <ContactList></ContactList>
    </div>
  );
}

export default Phonebook;
