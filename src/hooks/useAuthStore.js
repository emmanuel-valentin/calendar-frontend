import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking());

      const { data } = await calendarApi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (err) {
      dispatch(onLogout('Credenciales incorrectas'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(onChecking());

      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (err) {
      const { msg } = err.response.data;

      dispatch(onLogout(msg || '¡Opps! Parece que algo no salió bien.'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get('auth/renew');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      console.log({ data });

      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (err) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    /** Propiedades */
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,

    /** Funciones */
    errorMessage,
    status,
    user,
  };
};
