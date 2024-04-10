import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../Buttons/buttonPrimary';
import { ButtonSecondary } from '../../Buttons/buttonSecondary';
import { useForm } from 'react-hook-form';
import { InputText } from '../Inputs/inputText';
import { SelectOptions } from '../Selects/selectOptions';
import { createRegisterRent } from '../../../api/register.api';
import { getOutfit } from '../../../api/register.api';
import { getEvent } from '../../../api/register.api';
import swal from 'sweetalert'; // Importar SweetAlert
import './RentaForm.css';
import { NavLink } from 'react-router-dom';

export default function RentFriendForm() {
  const { register, handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [selectedHour, setSelectedHour] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState("");
  const [outfit, setOutfit] = useState([]);
  const [event, setEvent] = useState([])

  const onSubmit = handleSubmit(async (data) => {
    const frent = {
      fecha_cita: data.fecha_cita,
      time: data.time,
      duration: parseFloat(data.duration),
      event: parseInt(data.id_event),
      outfit: parseInt(data.id_outfit),
      location: data.location,
      description: data.description,
      friend: 3,
      client: 1
    };

    try {
      const restRent = await createRegisterRent(frent);
      console.log(restRent);
      swal("Reserva exitosa", "", "success"); // Mostrar mensaje de reserva exitosa
      setTimeout(() => { // Desaparecer el mensaje después de 1 segundo
        swal.close();
      }, 1000);
      reset();
    } catch (error) {
      console.log(error);
    }
  });

  const confirmCancel = () => {
    swal({
      title: "¿Está seguro de cancelar?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("Se canceló la operación", {
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    async function loadOutfit() {
      try {
        const res = await getOutfit();
        setOutfit(res.data)
      } catch (error) {
        console.log("Error al cargar las vestimentas: ", error)
      }
    }

    loadOutfit();
  }, [])

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await getEvent();
        setEvent(res.data)
        console.log(res.data)
      } catch (error) {
        console.log("Error al cargar las vestimentas: ", error)
      }
    }

    loadEvent();
  }, [])

  const optionsHour = [
    { value: 1.0, label: "1 hora" },
    { value: 2.0, label: "2 horas" },
    { value: 3.0, label: "3 horas" },
    { value: 4.0, label: "4 horas" },
    { value: 5.0, label: "5 horas" }
  ]

  return (
    <div className="container">
      <div className="form-frame">
        <div className="title">
          <h1>Datos para el Alquiler</h1>
        </div>
        <form action='' id="formulario-alquiler" onSubmit={onSubmit}>
          <div className='colums_inputs'>
            <div className='column-left'>
              <div className='input-1c'>
                <InputText
                  id={"fecha_cita"}
                  label={"Fecha de la cita"}
                  type={"date"}
                  required={true}
                  placeholder={"dd/mm/aaaa"}
                  register={register("fecha_cita", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio."
                    },
                    validate: (value) => {
                      const fechaActual = new Date();
                      const fechaPropuesta = new Date(value);

                      if (isNaN(fechaPropuesta))
                        return "La fecha ingresada no tiene un formato válido";
                      else if (fechaPropuesta <= fechaActual)
                        return "La fecha debe ser mayor a la actual";


                      const fechaLimite = new Date(fechaActual);
                      fechaLimite.setMonth(fechaLimite.getMonth() + 5);

                      if (fechaPropuesta > fechaLimite)
                        return "La fecha propuesta excede el límite de 5 meses";
                    }

                  })}
                  errors={errors}
                />
              </div>
              <div className='input-1c'>
                <InputText
                  id={"time"}
                  label={"Hora de la cita"}
                  type={"time"}
                  required={true}
                  register={register("time", {
                    required: {
                      value: true,
                      message: "Este campo es obligatorio."
                    },
                    validate: (value) => {
                      const selectedTime = new Date(`01/01/2000 ${value}`);
                      const startTime = new Date(`01/01/2000 06:00`);
                      const endTime = new Date(`01/01/2000 21:00`);

                      if (selectedTime < startTime || selectedTime > endTime) {
                        return "La hora debe estar entre las 6:00 AM y las 21:00 PM.";
                      }
                    }
                  })}
                  errors={errors}
                />

              </div>
            </div>
            <div className='Input-1c'>
              <SelectOptions
                id={"duration"}
                label={"Duración de la cita"}
                name={"hora"}
                placeholder={"Elija la duración de la cita"}
                value={selectedHour}
                required={true}
                options={optionsHour}
                register={register("duration", {
                  required: {
                    value: true,
                    message: "Campo requerido"
                  }
                })}
                errors={errors}
                onChange={(e) => setSelectedHour(e.target.value)}
              />
            </div>
            <div className='input-1c'>
              <SelectOptions
                id={"id_event"}
                label={"Evento"}
                name={"evento"}
                placeholder={"Elija el tipo de evento"}
                value={selectedEvent}
                required={false}
                options={event.map((event, index) => ({
                  value: event.id_event,
                  label: event.type_event
                }))}
                register={register("id_event")}
                onChange={(e) => setSelectedEvent(e.target.value)}
              />
            </div>
            <div className='input-1c'>
              <SelectOptions
                id={"outfit"}
                label={"Vestimenta para el evento"}
                name={"tipoVestimenta"}
                placeholder={"Elija su vestimenta para el evento"}
                value={selectedOutfit}
                required={false}
                options={outfit.map((outfit, index) => ({
                  value: outfit.id_oufit,
                  label: outfit.type_outfit
                }))}
                register={register("id_outfit")}
                onChange={(e) => setSelectedOutfit(e.target.value)}
              />
            </div>
            <div className="input-4c location">
              <InputText
                id={"location"}
                label={"Ubicación de la cita"}
                type={"text"}
                required={true}
                placeholder={"Ingrese la ubicación de la cita"}
                register={register("location", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio."
                  },
                  maxLength: {
                    value: 40,
                    message: "La ubicación no debe exceder los 30 caracteres"
                  }
                })}
                errors={errors}
              />

            </div>

            <div className="input-4c descripction">
              <InputText
                id={"description"}
                label={"Descripcion"}
                type={"textarea"}
                required={false}
                placeholder={"Ingrese una descripcion para la cita"}
                register={register("description", {
                  maxLength: {
                    value: 150,
                    message: "La descripcion no debe exceder los 150 caracteres"
                  }
                })}
                errors={errors}
              />
            </div>
          </div>
          <div className="buttons-section">
            <ButtonPrimary type={"submit"} label={"Alquilar"} />
            <NavLink to='/listfriend'>
              <ButtonSecondary label={"Cancelar"} onClick={confirmCancel} />
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
