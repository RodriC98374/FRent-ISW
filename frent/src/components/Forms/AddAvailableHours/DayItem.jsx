import React, { useState, useEffect } from "react";
//import InputText from "../Inputs/InputText.jsx";
import SelectOptions from "../Selects/selectOptions.jsx";

export default function DayItem({
  type,
  placeholder,
  dayName,
  onSelectTimeFrom,
  onSelectTimeTo,
}) {
  const [icon, iconSelected] = useState(false);
  const [selectedAMPM, setSelectedAMPM] = useState("AM");
  const [selectedTimeFrom, setSelectedTimeFrom] = useState("06:00");
  const [selectedTimeTo, setSelectedTimeTo] = useState("09:00");
  const [endTimeOptions, setEndTimeOptions] = useState([
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
  ]);


  useEffect(() => {
    onSelectTimeFrom(dayName, selectedTimeFrom);
    onSelectTimeTo(dayName, selectedTimeTo);
  }, [selectedTimeFrom, selectedTimeTo, dayName, onSelectTimeFrom, onSelectTimeTo]);

  const ampmList = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const hoursAM = [
    { value: "06:00", label: "06:00" },
    { value: "07:00", label: "07:00" },
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
  ];

  const hoursPM = [
    { value: "13:00", label: "01:00" },
    { value: "14:00", label: "02:00" },
    { value: "15:00", label: "03:00" },
    { value: "16:00", label: "04:00" },
    { value: "17:00", label: "05:00" },
    { value: "18:00", label: "06:00" },
    { value: "19:00", label: "07:00" },
    { value: "20:00", label: "08:00" },
    { value: "21:00", label: "09:00" },
  ];

  const toggleIcon = () => {
    iconSelected(!icon);
    setSelectedTimeFrom("");
    setSelectedTimeTo("");
  };

  const handleAMPMChange = (selectedValue) => {
    setSelectedAMPM(selectedValue);
  };

  const handleTimeChangeFrom = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== "21:00") {
      setSelectedTimeFrom(selectedValue);
      filterEndTimeOptions(selectedValue);
    }
    // Si se selecciona "12:00 AM", cambiar automáticamente el período de tiempo a "PM" en el selector de hora final
    if (selectedValue === "12:00") {
      setSelectedAMPM("PM");
    }

    // Filtrar opciones para el selector de hora final
    onSelectTimeFrom(dayName, selectedTimeFrom);
  };

  const handleTimeChangeTo = (event) => {
    const selectedValue = event.target.value;
    // Si el valor seleccionado en el segundo selector es menor o igual al valor seleccionado en el primer selector,
    // actualiza el valor del segundo selector
    if (selectedTimeFrom && selectedValue <= selectedTimeFrom) {
      setSelectedTimeTo("");
    } else {
      setSelectedTimeTo(selectedValue);
    }
    onSelectTimeTo(dayName, selectedTimeTo);
  };

  const filterEndTimeOptions = (selectedStartTime) => {
    if (selectedStartTime) {
      const filteredOptions =
        selectedAMPM === "AM" && selectedStartTime !== "12:00"
          ? hoursAM.filter((hour) => hour.value > selectedStartTime)
          : hoursPM.filter((hour) => hour.value > selectedStartTime);
      if (filteredOptions[0].value > selectedTimeTo) {
        setEndTimeOptions(filteredOptions);
        setSelectedTimeTo(filteredOptions[0]?.value || "");
      }
    }
  };

  return (
    <div>
      {icon ? (
        <div className="day">
          <svg
            className={icon ? "toggle-icon-selected" : "toggle-icon"}
            onClick={toggleIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            {icon ? (
              <path
                fill="currentColor"
                d="M8 5h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m8 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
              />
            ) : (
              <path
                fill="currentColor"
                d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
              />
            )}
          </svg>
          <p className="day-name">{dayName}</p>
          <div className="unavailable-day">
            <p>Día no disponible</p>
          </div>
        </div>
      ) : (
        <div className="day">
          <svg
            className={icon ? "toggle-icon-selected" : "toggle-icon"}
            onClick={toggleIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            {icon ? (
              <path
                fill="currentColor"
                d="M8 5h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m8 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
              />
            ) : (
              <path
                fill="currentColor"
                d="M8 7a5 5 0 0 0 0 10h8a5 5 0 0 0 0-10zm0-2h8a7 7 0 1 1 0 14H8A7 7 0 1 1 8 5m0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
              />
            )}
          </svg>
          <p className="day-name">{dayName}</p>
          <p>De</p>
          <SelectOptions
            options={selectedAMPM === "AM" ? hoursAM : hoursPM}
            value={selectedTimeFrom}
            onChange={handleTimeChangeFrom}
          />
          <SelectOptions
            options={ampmList}
            placeholder={selectedAMPM}
            onChange={(e) => handleAMPMChange(e.target.value)}
          />
          <p>a</p>
          <SelectOptions
            options={endTimeOptions}
            value={selectedTimeTo}
            onChange={handleTimeChangeTo}
          />
          <SelectOptions
            options={ampmList}
            placeholder={selectedAMPM}
            onChange={(e) => handleAMPMChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
