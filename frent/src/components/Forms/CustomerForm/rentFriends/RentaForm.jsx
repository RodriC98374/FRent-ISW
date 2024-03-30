import React, { useState } from 'react';
import './RentaForm.css';
import { ButtonPrimary } from '../../../Buttons/buttonPrimary';
import { ButtonSecondary } from '../../../Buttons/buttonSecondary';
import { useForm } from 'react-hook-form';
import { InputText } from '../../Inputs/inputText';
import { SelectOptions } from '../../Selects/selectOptions';

export default function RentaForm() {
  const { register, handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm();
  
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedOutfit, setSelectedOutfit] = useState("");

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    alert("Envio correcto de datos")
    setValue('correo', '')
    reset()
    //  send data to server here

  });

  const optionsHour = [
    {value: "1 hora", label: "1 hora"},
    {value: "2 horas", label: "2 horas"},
    {value: "3 horas", label: "3 horas"},
    {value: "4 horas", label: "4 horas"},
    {value: "5 horas", label: "5 horas"}
  ]

  const optionsEvent = [
    {value: "cumpleaños", label: "cumpleaños"},
    {value: "aniversario", label: "aniversario"},
    {value: "Propuesta Matrimonio", label: "Propuesta matrimonio"}
  ]

  const optionsOutfit = [
    {value: "casual", label: "Casual"},
    {value: "formal", label: "Formal"},
    {value: "semiFormal", label: "SemiFormal"}

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
                id={"FechaCita"}
                label={"Fecha Cita"}
                type={"date"}
                required={true}
                placeholder={"dd/mm/aaaa"}
                register={register("fechaCita", {
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
                id={"HoraCita"}
                label={"Hora Cita"}
                type={"time"}
                required={true}
                register={register("horaCita", {
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
                    id = {"hora"}
                    label={"hora"}
                    name = {"hora"}
                    placeholder={"Elija la duracion de la cita"}
                    value={selectedHour}
                    required={true}
                    options={optionsHour}
                    register={register("hour", {
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
                    id = {"evento"}
                    label = {"evento"}
                    name = {"evento"}
                    placeholder={"Elija el tipo de evento"}
                    value = {selectedEvent}
                    required={true}
                    options={optionsEvent}
                    register={register("event", {
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
                id = {"tipoVestimenta"}
                label={"Tipo de vestimenta"}
                name = {"tipoVestimenta"}
                placeholder={"Elija su vestimenta para el evento"}
                value = {selectedOutfit}
                required={true}
                options={optionsOutfit}
                register={register("outfit", {
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

              ></textarea>
              {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
            </div>

            <div className="input-4c descripction">
              <label htmlFor="descripcion">Descripción</label>
              <textarea name="descripcion" className="textAreaDescription"
                {...register("descripcion", {
                  required: {
                    value: false
                  }
                  , maxLength: {
                    value: 500,
                    message: "Numero de caracteres excedido"
                  }
                })}

              ></textarea>
              {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
            </div>
          </div>
          <div className="buttons-section">
            <ButtonSecondary label={"Cancelar"} />
            <ButtonPrimary type={"submit"} label={"Alquilar"} />
          </div>
        </form>
      </div>
    </div>
  );
}
