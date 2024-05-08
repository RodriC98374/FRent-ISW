import React, { useState } from "react";
import "./AddAvailableHours.css";
import { ButtonSecondary } from "../../Buttons/buttonSecondary";
import { ButtonPrimary } from "../../Buttons/buttonPrimary";
import DayItem from "./DayItem";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { createRegisterFriend } from "../../../api/register.api";
import { createLikes, createAvailability } from "../../../api/register.api";
import swal from "sweetalert";

export default function AddAvailableHours() {
  const location = useLocation();
  const friendData = location.state;
  const navigate = useNavigate();

  const [mondayFrom, setMondayFrom] = useState("");
  const [mondayTo, setMondayTo] = useState("");
  const [tuesdayFrom, setTuesdayFrom] = useState("");
  const [tuesdayTo, setTuesdayTo] = useState("");
  const [wednesdayFrom, setWednesdayFrom] = useState("");
  const [wednesdayTo, setWednesdayTo] = useState("");
  const [thursdayFrom, setThursdayFrom] = useState("");
  const [thursdayTo, setThursdayTo] = useState("");
  const [fridayFrom, setFridayFrom] = useState("");
  const [fridayTo, setFridayTo] = useState("");
  const [saturdayFrom, setSaturdayFrom] = useState("");
  const [saturdayTo, setSaturdayTo] = useState("");
  const [sundayFrom, setSundayFrom] = useState("");
  const [sundayTo, setSundayTo] = useState("");

  const [isAtLeastOneDaySelected, setIsAtLeastOneDaySelected] = useState(false);

  const registerFrom = (dayName, time) => {
    if (dayName === "Lunes") {
      setMondayFrom(time);
    } else if (dayName === "Martes") {
      setTuesdayFrom(time);
    } else if (dayName === "Miercoles") {
      setWednesdayFrom(time);
    } else if (dayName === "Jueves") {
      setThursdayFrom(time);
    } else if (dayName === "Viernes") {
      setFridayFrom(time);
    } else if (dayName === "Sabado") {
      setSaturdayFrom(time);
    } else if (dayName === "Domingo") {
      setSundayFrom(time);
    }
  };

  const registerTo = (dayName, time) => {
    if (dayName === "Lunes") {
      setMondayTo(time);
    } else if (dayName === "Martes") {
      setTuesdayTo(time);
    } else if (dayName === "Miercoles") {
      setWednesdayTo(time);
    } else if (dayName === "Jueves") {
      setThursdayTo(time);
    } else if (dayName === "Viernes") {
      setFridayTo(time);
    } else if (dayName === "Sabado") {
      setSaturdayTo(time);
    } else if (dayName === "Domingo") {
      setSundayTo(time);
    }
  };

  const backPage = () => {
    const data = friendData.friendDataNew;
    navigate("/photo", {
      state: {
        city: data.city,
        country: data.country,
        email: data.email,
        first_name: data.first_name,
        gender: data.gender,
        last_name: data.last_name,
        password: data.password,
        confirmPassword: data.confirmarPassword,
        personal_description: data.personal_description,
        birth_date: data.birth_date,
        price: data.price,
        image: data.image,
        file: data.file,
        is_client: data.is_client,
        likes: data.likes,
      }
    });
  }


  const submitDataFriend = async () => {
    try {
      if (!isAtLeastOneDaySelected) {
        // Si no hay ningún día seleccionado, muestra una advertencia
        swal("Advertencia", "Debe seleccionar al menos un día de la semana", "warning");
        return;
      }

      //PETICION PARA REGISTRAR DATOS PERSONALES
      const data = friendData.friendDataNew;

      const friend = {
        city: data.city,
        country: data.country,
        email: data.email,
        first_name: data.first_name,
        gender: data.gender,
        last_name: data.last_name,
        password: data.password,
        personal_description: data.personal_description,
        birth_date: data.birth_date,
        price: data.price,
        image: data.image,
      };

      const resFriend = await createRegisterFriend(friend);

      //PETICION PARA REGISTRAR GUSTOS
      const user_likes = {
        likes: data.likes,
        user_id: resFriend.data.id_user,
      };

      await createLikes(user_likes);
      swal(
        "Registro exitoso",
        "El cliente se registró correctamente",
        "success"
      );
      setTimeout(() => {
        swal.close();
      }, 1000);

      //PETICION PARA REGISTRAR DISPONIBILIDAD
      const disponibilidad = {
        user_id: resFriend.data.id_user,
        disponibilidades: [
          ["Lunes", mondayFrom, mondayTo],
          ["Martes", tuesdayFrom, tuesdayTo],
          ["Miercoles", wednesdayFrom, wednesdayTo],
          ["Jueves", thursdayFrom, thursdayTo],
          ["Viernes", fridayFrom, fridayTo],
          ["Sabado", saturdayFrom, saturdayTo],
          ["Domingo", sundayFrom, sundayTo],
        ],
      };

      console.log("Las disponibilidades son: ", disponibilidad);

      await createAvailability(disponibilidad);

      navigate("/login");
    } catch (Error) {
      console.log("Ocurrio un error en:", Error);
      <Navigate to="/"></Navigate>;
    }
  };

  const handleSelectTime = ({ isSelected, dayName, startTime, endTime }) => {
    if (isSelected) {
      setIsAtLeastOneDaySelected(true); // Marca que al menos un día está seleccionado
      registerFrom(dayName, startTime);
      registerTo(dayName, endTime);
    } else {
      // Si se deselecciona un día, verifica si aún queda algún día seleccionado
      const isAnyDaySelected =
        mondayFrom ||
        tuesdayFrom ||
        wednesdayFrom ||
        thursdayFrom ||
        fridayFrom ||
        saturdayFrom ||
        sundayFrom;
      setIsAtLeastOneDaySelected(isAnyDaySelected);
    }
  };

  return (
    <div className="body-add-AH">
      <div className="container container-available">
        <h2>Elija su disponibilidad de días y horarios</h2>
        <div className="days-to-week">
          <DayItem   dayName="Lunes"    onSelectTime={handleSelectTime}
          />
          <DayItem dayName="Martes"     onSelectTime={handleSelectTime}
          />
          <DayItem dayName="Miercoles"  onSelectTime={handleSelectTime}
          />
          <DayItem dayName="Jueves"     onSelectTime={handleSelectTime}
          />
          <DayItem  dayName="Viernes"   onSelectTime={handleSelectTime}
          />
          <DayItem dayName="Sabado"     onSelectTime={handleSelectTime}
          />
          <DayItem dayName="Domingo"    onSelectTime={handleSelectTime}
          />
        </div>

        <div className="button-section">
          <ButtonSecondary onClick = {backPage} label={"Atras"} />

          <ButtonPrimary onClick={submitDataFriend} label={"Registrar"} />
        </div>
      </div>
    </div>
  );
}
