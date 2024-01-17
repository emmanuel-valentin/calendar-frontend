import { localizer } from '../../helpers';

import { Calendar } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesEs } from '../../helpers/getMessages';
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from '../components';
import { useUiStore } from '../../hooks/useUiStore';
import { useAuthStore, useCalendarStore } from '../../hooks/';
import { useEffect } from 'react';

const CalendarPage = () => {
  const lastView = localStorage.getItem('lastView') || 'month';
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();

  const eventStyleGetter = (event) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? '#367CF7' : '#465660',
      borderRadius: '10px',
      height: '50px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };
  
  const onSelect = (event) => {
    setActiveEvent(event);
  };
  
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
  };
  
  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

export default CalendarPage;
