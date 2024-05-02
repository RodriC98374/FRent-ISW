import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import './EventList.css'
import dayjs from "dayjs";

const EventList = ({ date, events, onCloseModal }) => {
  const filteredEvents = events.filter(
    (event) =>
      dayjs(date).isSame(dayjs(event.start), "day") ||
      dayjs(date).isSame(dayjs(event.end), "day")
  );

  return (
    <div className="listaEvento">
      <button className="closeButton" onClick={onCloseModal}>X</button>
      <div className="title">
        <h2>
          Ver reservas
          <IoCalendarOutline className="Icon1" />
          {date.format("DD MMM")}
        </h2>
      </div>
      <div className="reserv-container">
        <h3>Reservas</h3>
        <p>Total Reservas: {filteredEvents.length}</p>
        <div>
          {filteredEvents.map((event, index) => (
            <div key={index}>
              <h4>{event.title}</h4>
              <p>{dayjs(event.start).format("HH:mm")}-{dayjs(event.end).format("HH:mm")} / Duración: {event.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
