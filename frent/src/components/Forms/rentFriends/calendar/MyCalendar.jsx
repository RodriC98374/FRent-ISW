import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
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

  const localizer = dayjsLocalizer(dayjs, {
    messages: {
      today: 'Hoy',
      back: 'Atrás',
      next: 'Siguiente',
    },
  });

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const data = await obtenerHorariosReservas();
      setEvents(data); // Actualizar eventos con los datos obtenidos
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  const dayStyleGetter = (date) => {
    const hasEvent = events.some(
      (event) =>
        dayjs(event.start).isSame(date, 'day') ||
        dayjs(event.end).isSame(date, 'day')
    );
    return hasEvent ? { style: { backgroundColor: '#333A73', borderRadius: '10px' } } : {};
  };

  const calendarStyle = {
    height: 500,
    backgroundColor: '#fff',
  };

  const handleAddEvent = (date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
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
            <EventList
              date={selectedDate}
              events={events}
              onAddEvent={handleAddEvent}
              onCloseModal={handleCloseModal}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CalendarEdit;
