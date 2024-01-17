import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import { useAuthStore } from './useAuthStore';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useAuthStore();
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Pegarle al backend jejep

    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));

        return;
      }

      // Creando
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error actualizando la nota',
        text: err.response.data.msg,
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error actualizando la nota',
        text: err.response.data.msg,
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (err) {
      console.log(err);
    }
  };

  return {
    /* Estados */
    events,
    activeEvent,
    hasEventSelected: Boolean(activeEvent),

    /* Eventos */
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
