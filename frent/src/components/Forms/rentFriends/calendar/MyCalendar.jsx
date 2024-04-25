import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import EventList from './EventList';
import { obtenerHorariosReservas } from '../../../../api/register.api';
import 'dayjs/locale/es';
import './MyCalendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

dayjs.locale('es');

function CalendarEdit() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); 
  const { id } = useParams(); 
  const friendId = parseInt(id); 
  

  console.log(events)
  const localizer = dayjsLocalizer(dayjs, {
    messages: {
      today: 'Hoy',
      back: 'Atrás',
      next: 'Siguiente',
    },
  });

  const dayStyleGetter = (date) => {
    const hasEvent = events.some(
      (event) =>
        dayjs(event.start).isSame(date, 'day') ||
        dayjs(event.end).isSame(date, 'day')
    );
    return hasEvent ? { style: { backgroundColor: '#333A73', borderRadius: '10px' } } : {};
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const res = await obtenerHorariosReservas(friendId);
      const eventosTransformados = res.data.map((evento, index) => ({
      start: dayjs(evento.fecha_alquiler + 'T' + evento.hora_inicio).toDate(),
      end: dayjs(evento.fecha_alquiler + 'T' + evento.hora_fin).toDate(),
      eventType: `${evento.tipo_evento} ${index + 1}`,
      duration: `${evento.duration} horas`, 
    }));
    setEvents(eventosTransformados); 
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };
  

  
  const calendarStyle = {
    height: 500,
    backgroundColor: '#fff',
  };

  const handleAddEvent = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className="calendar">
        <div className="calendarList">
          <Calendar
            localizer={localizer}
            events={events}
            views={['month']}
            toolbar={true}
            style={calendarStyle}
            components={{
              day: {
                event: ({ event }) => (
                  <button
                    onClick={() => handleAddEvent(dayjs(event.start))}
                    style={{ backgroundColor: '#FBA834' }}
                  ></button>
                ),
              },
            }}
            dayPropGetter={dayStyleGetter}
            selectable={true}
            onSelectSlot={(slotInfo) => handleAddEvent(dayjs(slotInfo.start))}
          />
          {selectedDate && (
            <div className='modalBackground'>
            <EventList
              date={selectedDate}
              events={events}
              onAddEvent={handleAddEvent}
              onCloseModal={handleCloseModal}
            />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CalendarEdit;
