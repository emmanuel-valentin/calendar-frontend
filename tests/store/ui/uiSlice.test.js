import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store';

describe('Pruebas en uiSlice', () => {
  test('debe regresar el estado inicial', () => {
    const initialState = {
      isDateModalOpen: false,
    };

    const state = uiSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test('debe de cambiar el isDateModalOpen correctamente', () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
