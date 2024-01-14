import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './AuthPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordConfirm: '',
};

const AuthPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  }, [errorMessage]);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConfirm,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPasswordConfirm) {
      Swal.fire({
        title: 'Error en el registro',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });

      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPasswordConfirm"
                value={registerPasswordConfirm}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
