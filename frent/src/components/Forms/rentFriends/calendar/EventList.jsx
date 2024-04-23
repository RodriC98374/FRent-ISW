import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import './EventList.css'
import dayjs from "dayjs";

const EventList = ({ date, events, onAddEvent, isAM }) => {
  const filteredEvents = events.filter(
    (event) =>
      dayjs(date).isSame(dayjs(event.start), "day") ||
      dayjs(date).isSame(dayjs(event.end), "day")
  );

  return (
    <div className="listaEvento">
      <div className="title">
        <h2>
        Ver reservas
          <IoCalendarOutline className="Icon1" />
          {date.format("DD MMM")}
        </h2>
      </div>
      <div className="reserv-container">
        <h3>Reservas</h3>
        <p>Total Reservas: 9</p>
        <div>
          <div>
            <h4>Reserva 1</h4>
            <p>12:00-15:00 / Duracion: 3horas</p>
          </div>
          <div>
            <h4>Reserva 2</h4>
            <p>12:00-15:00 / Duracion: 3horas</p>
          </div>
          <div>
            <h4>Reserva 3</h4>
            <p>12:00-15:00 / Duracion: 3horas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
