import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const onClickDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={onClickDelete}
      style={{ display: hasEventSelected && !isDateModalOpen ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

export default FabDelete;
