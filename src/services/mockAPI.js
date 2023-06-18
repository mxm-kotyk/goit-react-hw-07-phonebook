import axios from 'axios';

axios.defaults.baseURL = 'https://648f2fb475a96b664444ce4d.mockapi.io';

export const fetchContactsRequest = async () => {
  const { data } = await axios.get('/contacts');
  console.log(data);
  return data;
};

export const addContactRequest = async contactData => {
  const { data } = await axios.post('/contacts', contactData);
  console.log(data);
  return data;
};

export const deleteContactRequest = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  console.log(data);
};
