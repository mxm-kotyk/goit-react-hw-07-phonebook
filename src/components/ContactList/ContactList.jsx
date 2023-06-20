import { Contact } from './Contact/Contact';
import { ContactsList } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { errorToast } from 'helpers/toasts';
import { DotWave } from '@uiball/loaders';
import { selectIsLoading } from 'redux/selectors';
import { selectError } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/thunks';
import { Toaster } from 'react-hot-toast';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const loadingIndicator = isLoading && (
    <DotWave size={100} speed={1} color="#204154" />
  );

  const showError = error && errorToast(error);

  return (
    <div>
      <ContactsList>
        {showError}
        {loadingIndicator}
        {filteredContacts.map(({ id, name, number }) => {
          return <Contact key={id} id={id} name={name} number={number} />;
        })}
      </ContactsList>
      <Toaster />
    </div>
  );
};
