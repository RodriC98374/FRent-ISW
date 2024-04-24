import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import EventList from './EventList'
import { FaKitchenSet } from "react-icons/fa6";
import { IoMdBriefcase } from "react-icons/io";
import 'dayjs/locale/es';
import './MyCalendar.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';


dayjs.locale("es");

function CalendarEdit() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    {
      start: dayjs('2024-04-18T12:00:00').toDate(),
      end: dayjs('2024-04-18T13:00:00').toDate(),
      eventType: 'Presencial',
    },
    {
      start: dayjs('2023-12-18T14:00:00').toDate(),
      end: dayjs('2023-12-18T15:00:00').toDate(),
      eventType: 'Pickup',
      
    },
  ]);

  const localizer = dayjsLocalizer(dayjs);

  const dayStyleGetter = (date) => {
    const hasEvent = events.some(
      (event) =>
        dayjs(event.start).isSame(date, 'day') || dayjs(event.end).isSame(date, 'day')
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

  return (
    <>
        <div className='calendar'>
        <div className='calendarList'>
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
                >
                </button>
              ),
            },
          }}
          dayPropGetter={dayStyleGetter}
          selectable={true}
          onSelectSlot={(slotInfo) => handleAddEvent(dayjs(slotInfo.start))}
        />
        
        {selectedDate && (
          <EventList date={selectedDate} events={events} onAddEvent={handleAddEvent} />
        )}

        </div>
    </div>
    </>
  );
}

export default CalendarEdit;
