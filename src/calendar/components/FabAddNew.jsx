import { addHours } from 'date-fns';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const onClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        _id: '123',
        name: 'Emmanuel Valentin',
      },
    });

    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={onClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default FabAddNew;
