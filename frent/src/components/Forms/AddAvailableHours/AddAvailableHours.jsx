import React from 'react'
import './AddAvailableHours.css'
import { ButtonSecondary } from '../../Buttons/buttonSecondary'
import { ButtonPrimary } from '../../Buttons/buttonPrimary'
import DayItem from './DayItem'

export default function AddAvailableHours() {

    return (
      <div className="body-add-AH">
        <div className='container'>
          <h2>Elija su disponibilidad de días y horarios</h2>
          <div className="days-to-week">
          <DayItem
            type="time"
            dayName="Lunes"
          />
          <DayItem
            type="time"
            dayName="Martes"
          />
          <DayItem
            type="time"
            dayName="Miercoles"
          />
          <DayItem
            type="time"
            dayName="Jueves"
          />
          <DayItem
            type="time"
            dayName="Viernes"
          />
          <DayItem
            type="time"
            dayName="Sabado"
          />
          <DayItem
            type="time"
            dayName="Domingo"
          />
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
      </div>
    )
}