import { fireEvent, render, screen } from '@testing-library/react';
import FabDelete from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';
import { useUiStore } from '../../../src/hooks/useUiStore';

jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('Pruebas en FabDelete', () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe renderizar el componente correctamente', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    render(<FabDelete />);

    const button = screen.getByLabelText('btn-delete');

    expect(button.classList).toContain('btn');
    expect(button.classList).toContain('btn-danger');
    expect(button.classList).toContain('fab-danger');
    expect(button.style.display).toBe('none');
  });

  test('debe mostrar el botón su hay un evento seleccionado', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    render(<FabDelete />);

    const button = screen.getByLabelText('btn-delete');

    expect(button.style.display).toBe('');
  });

  test('debe de llamar startDeletingEvent si existe un evento activo', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    useUiStore.mockReturnValue({
      isDateModalOpen: false,
    });

    render(<FabDelete />);

    const button = screen.getByLabelText('btn-delete');
    fireEvent.click(button);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
