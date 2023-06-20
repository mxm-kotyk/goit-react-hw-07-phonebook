import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { Ring } from '@uiball/loaders';
import {
  StyledForm,
  StyledField,
  FieldWrapper,
  Label,
  ErrorText,
  AddButton,
} from './ContactForm.styled';
import { errorToast, successAddToast, warningToast } from 'helpers/toasts';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectError, selectIsAdding } from 'redux/selectors';
import { addContact } from 'redux/thunks';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[\p{L} '-]+$/u,
      'Name may contain only letters, apostrophe, dash and spaces.'
    ),
  number: yup
    .string()
    .required('Number is required')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.'
    ),
});

export const ContactForm = () => {
  // const [addContact, { error, isLoading }] = useAddContactMutation();
  // const { data: contacts } = useGetAllContactsQuery();
  const contacts = useSelector(selectContacts);
  const isAdding = useSelector(selectIsAdding);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: '', number: '' },
    onSubmit: ({ name, number }) => handleSubmit(name, number),
    validationSchema,
  });

  const handleSubmit = (name, number) => {
    formik.resetForm();

    if (contacts.some(contact => contact.name.includes(name))) {
      warningToast(name);
      return;
    }

    const contactData = { name, number };
    dispatch(addContact(contactData));
    error ? errorToast(error) : successAddToast(name);
  };

  const nameInputId = uniqid();
  const numberInputId = uniqid();
  return (
    <div>
      <StyledForm onSubmit={formik.handleSubmit}>
        <FieldWrapper>
          <StyledField
            type="text"
            name="name"
            id={nameInputId}
            required
            placeholder="."
            className="styled-input"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Label htmlFor={nameInputId}>Name</Label>
          {formik.touched.name && formik.errors.name && (
            <ErrorText>{formik.errors.name}</ErrorText>
          )}
        </FieldWrapper>
        <FieldWrapper>
          <StyledField
            type="tel"
            name="number"
            id={numberInputId}
            required
            placeholder="."
            className="styled-input"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.number}
          />
          <Label htmlFor={numberInputId}>Number</Label>
          {formik.touched.number && formik.errors.number && (
            <ErrorText>{formik.errors.number}</ErrorText>
          )}
        </FieldWrapper>
        <AddButton type="submit" disabled={isAdding}>
          {isAdding ? (
            <Ring size={40} lineWeight={5} speed={2} color="white" />
          ) : (
            'Add contact'
          )}
        </AddButton>
      </StyledForm>
    </div>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
