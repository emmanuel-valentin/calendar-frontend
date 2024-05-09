import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useUiStore } from '../../src/hooks/useUiStore';
import { uiSlice } from '../../src/store';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe('Pruebas en useUiStore', () => {
  test('Debe regresar los valores por defectos', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });
  
  test('openDateModal debe colocar isDateModalOpen en true', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
  
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    
    const { openDateModal } = result.current;
    
    act(() => {
      openDateModal();
    })
    
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
  
  test('closeDateModal debe colocar isDateModalOpen en false', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
  
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    
    const { closeDateModal } = result.current;
    
    act(() => {
      closeDateModal();
    })
    
    expect(result.current.isDateModalOpen).toBeFalsy(); 
  });

  test('toggleDateModal debe cambiar isDateModalOpen respectivamente', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
  
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    
    act(() => {
      result.current.toggleDateModal();
    })
    
    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => {
      result.current.toggleDateModal();
    })

    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
