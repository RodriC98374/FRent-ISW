import React from 'react'
import './AddAvailableHours.css'
import { ButtonSecondary } from '../../Buttons/buttonSecondary'
import { ButtonPrimary } from '../../Buttons/buttonPrimary'
import { InputText } from '../Inputs/InputText';
import { SelectOptions } from '../Selects/selectOptions';

export default function AddAvailableHours() {
  const ampmList = [
    {value: "AM", label: "AM"},
    {value: "PM", label: "PM"}
  ]

    return (
      <div className='container'>
        <h2>Elija su disponibilidad de días y horarios</h2>
        <div className="day-to-week">
          <div className="day">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
            <p>Lunes</p>
            <p>De</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
            <p>a</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
          </div>
          <div className="day">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
            <p>Martes</p>
            <p>De</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
            <p>a</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
          </div>
          <div className="day">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
            <p>Miercoles</p>
            <p>De</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
            <p>a</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
          </div>
          <div className="day">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
            <p>Jueves</p>
            <p>De</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
            <p>a</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
          </div>
          <div className="day">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
            <p>Viernes</p>
            <p>De</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
            <p>a</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
          </div>
          <div className="day">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
            <p>Sabado</p>
            <p>De</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
            <p>a</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
          </div>
          <div className="day">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/></svg>
            <p>Domingo</p>
            <p>De</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
            <p>a</p>
            <InputText
              type="time"
              placeholder="09:00"
            />
            <SelectOptions
              options={ampmList}
              placeholder="AM"
            />
          </div>
        </div>
        <div className="button-section">
          <ButtonSecondary
            label="Atras"
          />
          <ButtonPrimary
            label="Registrar"
          />
        </div>
      </div>
    )
}