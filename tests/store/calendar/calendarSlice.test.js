import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store';
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {
  test('debe regresar el estado inicial', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent debe tener un evento activo', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent debe añadir un nuevo evento', () => {
    const newEvent = {
      id: '3',
      start: new Date('2022-11-10 13:00:00'),
      end: new Date('2022-11-10 15:00:00'),
      title: 'Cumpleaños de otra persona',
      notes: 'Alguna nota de otra persona',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvent debe actualizar un evento', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2022-10-21 13:00:00'),
      end: new Date('2022-10-21 15:00:00'),
      title: 'Cumpleaños de otra persona',
      notes: 'Alguna nota de otra persona',
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    expect(state.events).toContain(updatedEvent);
  });

  test('onDeleteEvent debe borrar el evento activo', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBeNull();
    expect(state.events).not.toContain(events[0]);
  });

  test('onLoadEvents debe establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    // expect(state).toEqual(calendarWithEventsState);

    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);
  });

  test('onLogoutCalendar debe limpiar el estado', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
