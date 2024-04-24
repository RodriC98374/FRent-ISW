import React, { useState } from "react";
//import InputText from "../Inputs/InputText.jsx";
import SelectOptions from "../Selects/selectOptions.jsx";


export default function DayItem({ type, placeholder, dayName }) {
    const [icon, iconSelected] = useState(false); 
    const [selectedAMPM, setSelectedAMPM] = useState("AM");
    const [selectedTimeFrom, setSelectedTimeFrom] = useState("");
    const [selectedTimeTo, setSelectedTimeTo] = useState("");
    const [endTimeOptions, setEndTimeOptions] = useState([]);

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
        { value: "01:00", label: "01:00" },
        { value: "02:00", label: "02:00" },
        { value: "03:00", label: "03:00" },
        { value: "04:00", label: "04:00" },
        { value: "05:00", label: "05:00" },
        { value: "06:00", label: "06:00" },
        { value: "07:00", label: "07:00" },
        { value: "08:00", label: "08:00" },
        { value: "09:00", label: "09:00" },
    ];

    const toggleIcon = () => {
        iconSelected(!icon);
    };

    const handleAMPMChange = (selectedValue) => {
        setSelectedAMPM(selectedValue);
    };

    const handleTimeChangeFrom = (event) => {
        const selectedValue = event.target.value;
        setSelectedTimeFrom(selectedValue);
        // Si se selecciona "12:00 AM", cambiar automáticamente el período de tiempo a "PM" en el selector de hora final
        if (selectedValue === "12:00") {
            setSelectedAMPM("PM");
            setSelectedTimeTo(""); // Reiniciar la hora final
        }
    
        // Filtrar opciones para el selector de hora final
        filterEndTimeOptions(selectedValue);
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
    };

    const filterEndTimeOptions = (selectedStartTime) => {
        if (selectedStartTime) {
            const filteredOptions = selectedAMPM === "AM" ? hoursAM.filter(hour => hour.value > selectedStartTime) : hoursPM.filter(hour => hour.value > selectedStartTime);
            setEndTimeOptions(filteredOptions);
            setSelectedTimeTo(filteredOptions[0]?.value || "");
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
      ):(
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
            placeholder="06:00" 
            value={selectedTimeFrom}
            onChange={handleTimeChangeFrom}    
        />
        <SelectOptions 
            options={ampmList} 
            placeholder={selectedAMPM} 
            onChange={(e) => handleAMPMChange(e.target.value)}/>
        <p>a</p>
        <SelectOptions 
            options={endTimeOptions}
            placeholder="09:00" 
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
