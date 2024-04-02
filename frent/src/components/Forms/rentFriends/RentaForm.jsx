import React, { useEffect, useState } from 'react';
import { ButtonPrimary } from '../../Buttons/buttonPrimary';
import { ButtonSecondary } from '../../Buttons/buttonSecondary';
import { useForm } from 'react-hook-form';
import { InputText } from '../Inputs/inputText';
import { SelectOptions } from '../Selects/selectOptions';
import { createRegisterRent } from '../../../api/register.api';
import { getOutfit } from '../../../api/register.api';
import { getEvent } from '../../../api/register.api';

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
      friend: 1,
      client: 24
    };
  
    try {
      const restRent = await createRegisterRent(frent);
      console.log(restRent);
      alert("Datos enviados correctamente");
      reset();
    } catch (error) {
      console.log(error);
    }
  });
  

  useEffect(() => {
    async function loadOutfit() {
      try {
        const res = await getOutfit();
        setOutfit(res.data)
      } catch (error) {
        console.log("Error al carhar las vestimentas: ", error)
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
        console.log("Error al carhar las vestimentas: ", error)
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
            <div className='input-2c'>
              <InputText
                id={"fecha_cita"}
                label={"Fecha Cita"}
                type={"date"}
                required={true}
                placeholder={"dd/mm/aaaa"}
                register={register("fecha_cita", {
                  required: {
                    value: true,
                    message: "Fecha de cita es requerida"
                  },
                  validate: (value) => {
                    const fechaActual = new Date();
                    const fechaPropuesta = new Date(value);

                    if (isNaN(fechaPropuesta))
                      return "La fecha ingresada no tiene un formato válido";

                    else if (fechaPropuesta <= fechaActual)
                      return "La fecha debe ser mayor a la actual";
                  }
                })}
                errors={errors}
              />
            </div>
            <div className='input-1c'>
              <InputText
                id={"time"}
                label={"Hora Cita"}
                type={"time"}
                required={true}
                register={register("time", {
                  required: {
                    value: true,
                    message: "Hora de cita es requerida"
                  },
                  validate: value => {
                    const horaActual = new Date().toLocaleTimeString('en-GB', { hour12: false });
                    const horaCita = value;

                    if (horaCita <= horaActual) {
                      return "La hora de la cita debe ser posterior a la hora actual";
                    }
                    return true;
                  }
                })}
                errors={errors}
              />
            </div>
            <div className='Input-1c'>
              <SelectOptions
                id={"duration"}
                label={"Hora"}
                name={"hora"}
                placeholder={"Elija la duracion de la cita"}
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
                required={true}
                options={event.map((event, index) => ({
                  value: event.id_event, 
                  label: event.type_event
                }))}
                register={register("id_event", {
                  required: {
                    value: true,
                    message: "Campo requerido"
                  }
                })}
                errors={errors}
                onChange={(e) => setSelectedEvent(e.target.value)}
              />
            </div>
            <div className='input-1c'>
              <SelectOptions
                id={"outfit"}
                label={"Tipo de vestimenta"}
                name={"tipoVestimenta"}
                placeholder={"Elija su vestimenta para el evento"}
                value={selectedOutfit}
                required={true}
                options={outfit.map((outfit, index) => ({
                  value: outfit.id_oufit,
                  label: outfit.type_outfit
                }))}
                register={register("id_outfit", {
                  required: {
                    value: true,
                    message: "Campo requerido"
                  }
                })}
                errors={errors}
                onChange={(e) => setSelectedOutfit(e.target.value)}
              />
            </div>
            <div className="input-4c location">
              <label htmlFor="location">Ubicación</label>
              <textarea name="location" className="textArea"
                {...register("location", {
                  required: {
                    value: true
                  }
                  , maxLength: {
                    value: 100,
                    message: "Numero de caracteres excedido"
                  }
                })}
                errors={errors}
              ></textarea>
              {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
            </div>

            <div className="input-4c descripction">
              <label htmlFor="descripcion">Descripción</label>
              <textarea id = {"description"} name="description" className="textAreaDescription"
                {...register("description",{
                  required:{
                    value: false
                  },
                  maxLength: {
                    value: 150,
                    message: "No debe  superar los 150 caracteres."
                  }
                })}
                errors = {errors}
              ></textarea>
              {/* {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>} */}
            </div>
          </div>
          <div className="buttons-section">
            <NavLink to='/listfriend'>
            <ButtonSecondary label={"Cancelar"} />
            </NavLink>
            <ButtonPrimary type={"submit"} label={"Alquilar"} />
          </div>
        </form>
      </div>
    </div>
  );
}
