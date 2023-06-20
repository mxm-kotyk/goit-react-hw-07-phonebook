import { toast } from 'react-hot-toast';

const errorToastParams = {
  duration: 3000,
  style: {
    borderRadius: '8px',
    padding: '16px',
    color: '#fff',
    backgroundColor: '#FF5549',
    boxShadow: 'none',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#FF5549',
  },
};

const successToastParams = {
  duration: 3000,
  style: {
    borderRadius: '8px',
    padding: '16px',
    color: '#fff',
    backgroundColor: '#32C682',
    boxShadow: 'none',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#32C682',
  },
};

const warningToastParms = {
  duration: 3000,
  style: {
    borderRadius: '8px',
    padding: '16px',
    color: '#fff',
    backgroundColor: '#ff7906',
    boxShadow: 'none',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#ff7906',
  },
};

export const errorToast = error => {
  toast.error(
    `Ooops somethink went wrong. Server says: ${error}`,
    errorToastParams
  );
};

export const successAddToast = name => {
  toast.success(`Contact '${name}' added to contacts`, successToastParams);
};

export const successDeleteToast = name => {
  toast.success(`Contact '${name}' deleted`, successToastParams);
};

export const warningToast = name => {
  toast.error(`'${name}' is already in contacts`, warningToastParms);
};
