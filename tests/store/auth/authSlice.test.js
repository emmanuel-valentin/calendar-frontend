import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../../../src/store';
import {
  authenticatedState,
  initialState,
} from '../../fixtures/authStates';
import { testUser } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {
  test('debe regresar el estado inicial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('debe realizar un login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUser));

    expect(state).toEqual({
      status: 'authenticated',
      user: testUser,
      errorMessage: undefined,
    });
  });

  test('debe realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    });
  });

  test('debe realizar el logout', () => {
    const errorMessage = 'Credenciales no válidas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage,
    });
  });

  test('debe de limpiar errorMessage', () => {
    const errorMessage = 'Credenciales no válidas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
  });

  test('debe realizar onChecking', () => {
    const state = authSlice.reducer(authenticatedState, onChecking());

    expect(state).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
    });
  });
});
