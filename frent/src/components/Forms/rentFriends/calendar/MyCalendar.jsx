import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { NavLink, useParams } from "react-router-dom";
import dayjs from "dayjs";
import EventList from "./EventList";
import { obtenerHorariosReservas } from "../../../../api/register.api";
import "dayjs/locale/es";
import "./MyCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";

dayjs.locale("es");

function CalendarEdit() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const friendId = parseInt(id);

  console.log(events);
  const localizer = dayjsLocalizer(dayjs, {
    messages: {
      today: "Hoy",
      back: "Atrás",
      next: "Siguiente",
    },
  });

  const dayStyleGetter = (date) => {
    const hasEvent = events.some(
      (event) =>
        dayjs(event.start).isSame(date, "day") ||
        dayjs(event.end).isSame(date, "day")
    );
    return hasEvent
      ? {
          style: {
            backgroundColor: "#333A73",
            borderRadius: "10px",
            border: "1px solid #000",
          },
        }
      : {};
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const res = await obtenerHorariosReservas(friendId);
      console.log("el res es", res);
      if (Array.isArray(res.data)) {
        const eventosTransformados = res.data.map((evento, index) => ({
          start: dayjs(
            evento.fecha_alquiler + "T" + evento.hora_inicio
          ).toDate(),
          end: dayjs(evento.fecha_alquiler + "T" + evento.hora_fin).toDate(),
          title: `Ocupado`,
          duration: `${evento.duration} horas`,
        }));
        setEvents(eventosTransformados);
      }
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  const calendarStyle = {
    height: 500,
    backgroundColor: "#fff",
  };

  const handleAddEvent = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setModalOpen(true);
  };

  return (
    <>
      <NavLink className="boton-calendar" to={`/rentaForm/${friendId}`}>
        <IoArrowBackCircleSharp />
      </NavLink>
      <div className="calendar">
        <div className="calendarList">
          <Calendar
            messages={{
              next: "Mes siguiente",
              previous: "Mes anterior",
              today: "Este mes",
            }}
          localizer={localizer}
          events={events}
          views={["month"]}
          toolbar={true}
          style={calendarStyle}
          components=
          {{
            day: {
              event: ({ event }) => (
                <button
                  onClick={() => handleAddEvent(dayjs(event.start))}
                  style={{
                    backgroundColor: "#3174ad",
                    borderRadius: "5px",
                    color: "#fff",
                    cursor: "pointer",
                    width: "100%",
                    height: "30px",
                    textAlign: "left",
                    padding: "0",
                  }}>
                  {" "}
                  <div>{event.eventType}</div>
                </button>
              ),
            },
          }}
          dayPropGetter={dayStyleGetter}
          selectable={true}
          onSelectSlot={(slotInfo) => handleAddEvent(dayjs(slotInfo.start))}
          />
          {selectedDate && (
            <div className="modalBackground">
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