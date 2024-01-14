import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { registerLocale } from 'react-datepicker';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const useCalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formSubmitted && formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formSubmitted, formValues.title]);

  useEffect(() => {
    if (activeEvent) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference < 0) {
      return Swal.fire(
        'Fechas no válidas',
        'Verifique que las fechas contengan el formato correcto',
        'error'
      );
    }
    if (formValues.title.trim().length <= 0) return;

    startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);

    // TODO: Cerrar el modal
    // TODO: Reestablecer el formulario
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  return {
    customStyles,
    formValues,
    onCloseModal,
    onDateChanged,
    onInputChanged,
    onSubmit,
    titleClass,
  };
};
