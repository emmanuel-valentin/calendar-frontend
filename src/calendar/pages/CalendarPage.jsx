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
import { useCalendarStore } from '../../hooks/';

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: '#367CF7',
    borderRadius: '10px',
    height: '50px',
    opacity: 0.8,
    color: 'white',
  };

  return {
    style,
  };
};

const CalendarPage = () => {
  const lastView = localStorage.getItem('lastView') || 'month';
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
  };

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
