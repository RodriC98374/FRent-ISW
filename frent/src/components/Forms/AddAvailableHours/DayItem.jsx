import { Switch } from "antd";
import React, { useState } from "react";
import Select from 'react-select';

const hours = [
  {value: "06:00", label: "06:00" },
  {value: "07:00", label: "07:00" },
  {value: "08:00", label: "08:00" },
  {value: "09:00", label: "09:00" },
  {value: "10:00", label: "10:00" },
  {value: "11:00", label: "11:00" },
  {value: "12:00", label: "12:00" },
  {value: "13:00", label: "13:00" },
  {value: "14:00", label: "14:00" },
  {value: "15:00", label: "15:00" },
  {value: "16:00", label: "16:00" },
  {value: "17:00", label: "17:00" },
  {value: "18:00", label: "18:00" },
  {value: "19:00", label: "19:00" },
  {value: "20:00", label: "20:00" },
  {value: "21:00", label: "21:00" },
];

export default function DayItem({
  dayName,
  onSelectTime
}) {
  const [icon, setIcon] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const endTimeOptions = hours.filter(option => {
    if (startTime) {
      return option.value > startTime.value; // Filtra solo opciones mayores a la hora de inicio seleccionada
    }
    return true; // Si no se ha seleccionado una hora de inicio, muestra todas las opciones
  });

  const toggleIcon = () => {
    setIcon(!icon);
    setIsSelected(!isSelected);
  };

  const handleStartTimeChange = (selectedOption) => {
    setStartTime(selectedOption);
  };

  const handleEndTimeChange = (selectedOption) => {
    onSelectTime({
      isSelected: !icon,
      dayName: dayName,
      startTime: startTime?.value,
      endTime: selectedOption?.value,
    });
  };


  return (
    <div>
      <div className="day">
        <Switch
          checked={!icon}
          onChange={toggleIcon}
        />
        <p className="day-name">{dayName}</p>
        {icon ? (
          <div className="unavailable-day">
            <p>Día no disponible</p>
          </div>
        ) : (
          <div className="available-day">
            <p>De</p>
            <Select
              className="hours-selector"
              options={hours}
              placeholder="06:00"
              onChange={(selectedOption) => handleStartTimeChange(selectedOption)}
            />
            <p>a</p>
            <Select
              className="hours-selector"
              placeholder="09:00"
              options={endTimeOptions}
              isDisabled={!startTime}
              onChange={(selectedOption) => handleEndTimeChange(selectedOption)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
