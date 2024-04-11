import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../Buttons/buttonPrimary";
import { ButtonSecondary } from "../../Buttons/buttonSecondary";
import { NavLink } from "react-router-dom";
import { InputText } from "../Inputs/inputText";
import { SelectOptions } from "../Selects/selectOptions";
import { useState } from "react";
import { Country, State } from "country-state-city";
import { createRegisterFriend } from "../../../api/register.api";
import { createLikes } from "../../../api/register.api";

import InterestModal from "../Interests/interestSection";

export function FriendForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPrice, setSelectedPrices] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [cityEnabled, setCityEnabled] = useState(false);

  const translateErrorMessage = (errorMessage) => {
    const errorTranslations = {
      "user with this email already exists.": "Ya existe un usuario con este correo electrónico.",
    };

    return errorTranslations[errorMessage] || errorMessage;
  };

  const onSubmit = handleSubmit(async (data) => {
    const friend = {
      city: data.City,
      country: data.Country,
      email: data.Email,
      first_name: data.First_name,
      gender: data.Gender,
      last_name: data.Last_name,
      password: data.Password,
      personal_description: data.Personal_description,
      birth_date: data.birth_date,
      price: data.price,
    };

    try {
      const resFriend = await createRegisterFriend(friend);

      const user_likes = {
        likes: selectedInterests,
        user_id: resFriend.data.id_user,
      };

      await createLikes(user_likes);
      reset();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      if (error.response && error.response.data && error.response.data.email) {
        const translatedErrorMessage = translateErrorMessage(error.response.data.email[0]);
        setErrorMessage(translatedErrorMessage);
      } else {
        setErrorMessage(
          "Error al enviar los datos, por favor inténtelo de nuevo."
        );
      }
    }
  });

  const optionsGender = [
    { value: "femenino", label: "Femenino" },
    { value: "masculino", label: "Masculino" },
    { value: "noIndicado", label: "Prefiero no decirlo" },
  ];

  const priceOptions = [
    { value: "20", label: "20 bs" },
    { value: "30", label: "30 bs" },
    { value: "40", label: "40 bs" },
    { value: "50", label: "50 bs" },
    { value: "60", label: "60 bs" }
  ];

  const handleSaveInterests = (selectedInterests) => {
    if (selectedInterests.length < 2) {
      setErrorMessage("Debe seleccionar al menos 2 intereses.");
    } else {
      setSelectedInterests(selectedInterests);
      setErrorMessage(""); // Limpiar el mensaje de error si la validación pasa
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryIsoCode = e.target.value;
    setSelectedCountry(selectedCountryIsoCode);
    const states = State.getStatesOfCountry(selectedCountryIsoCode);
    setStates(states);
    // Limpia el estado seleccionado cuando se cambia el país
    setSelectedState("");
    // Actualizar el valor en el formulario
    setValue("pais", selectedCountryIsoCode);
    setCityEnabled(true);
  };

  const handleStateChange = (e) => {
    const selectedStateIsoCode = e.target.value;
    setSelectedState(selectedStateIsoCode);
    // Actualizar el valor en el formulario
    setValue("estado", selectedStateIsoCode);
  };

  return (
    <div className="body-page">
      <div className="form-body-container">
        <h3>Datos personales del amigo</h3>
        <form action="" id="formulario-cliente" onSubmit={onSubmit}>
          <div className="colums-inputs">
            <div className="input-2c">
              <InputText
                id={"First_name"}
                label={"Nombre(s)"}
                type={"text"}
                required={true}
                placeholder={"Ingrese su(s) nombre(s)"}
                register={register("First_name", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,3}$/,
                    message: "El nombre solo puede contener letras y maximo 3 espacios",
                  },

                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Demasiados caracteres",
                  },
                })}
                errors={errors}
              />
            </div>
            <div className="input-2c">
              <InputText
                id={"Last_name"}
                label={"Apellido(s)"}
                type={"text"}
                required={true}
                placeholder={"Ingrese su(s) apellido(s)"}
                register={register("Last_name", {
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,3}$/,
                    message: "El nombre solo puede contener letras y maximo 3 espacios",
                  },
                  minLength: {
                    value: 2,
                    message: "El apellido debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Demasiados caracteres",
                  },
                })}
                errors={errors}
              />
            </div>
            <div className="input-1c">
              <InputText
                id={"birth_date"}
                label={"Fecha de nacimiento"}
                type={"date"}
                required={true}
                placeholder={"DD/MM/AA"}
                register={register("birth_date", {
                  required: {
                    value: true,
                    message: "Fecha de nacimiento requerida",
                  },
                  validate: (value) => {
                    const fechaNacimiento = new Date(value);
                    const fechaActual = new Date();
                    const edad =
                      fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                    if (edad < 18) {
                      return "Debe ser mayor de edad";
                    } else if (edad > 100) {
                      return "Debe ser menor de 100 años";
                    } else {
                      return true;
                    }
                  },
                })}
                errors={errors}
              />
            </div>
            <div className="input-1c">
              <SelectOptions
                id={"Gender"}
                label={"Género"}
                name={"genero"}
                placeholder={"Elija su género"}
                value={selectedGender}
                required={true}
                options={optionsGender}
                register={register("Gender", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
                errors={errors}
                onChange={(e) => setSelectedGender(e.target.value)}
              />
            </div>
            <div className="input-1c">
              <SelectOptions
                className="pais-select"
                id={"Country"}
                label={"País"}
                name={"pais"}
                placeholder={"Seleccione su pais"}
                value={selectedCountry}
                required={true}
                onChange={handleCountryChange} // Manejador de cambio de selección
                options={Country.getAllCountries().map((country) => ({
                  value: country.isoCode,
                  label: country.name,
                }))}
                register={register("Country", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
                errors={errors}
              />
            </div>
            <div className="input-1c">
              <SelectOptions
                className="pais-select"
                id={"City"}
                label={"Ciudad"}
                name={"ciudad"}
                placeholder={"Elija una ciudad"}
                value={selectedState}
                required={true}
                onChange={handleStateChange}
                options={states.map((state) => ({
                  value: state.isoCode,
                  label: state.name && state.name.replace(" Department", ""),
                }))}
                register={register("City", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
                errors={errors}
                disabled={!cityEnabled}
              />
            </div>
            <div className="input-4c">
              <InputText
                id={"Email"}
                label={"Correo electrónico"}
                type={"email"}
                required={true}
                placeholder={"Ingrese su correo electrónico"}
                register={register("Email", {
                  required: {
                    value: true,
                    message: "El Correo es requerido",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Formato de email invalido",
                  },
                })}
                errors={errors}
              />
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <div className="input-2c">
              <InputText
                id={"Password"}
                label={"Contraseña"}
                type={"password"}
                required={true}
                placeholder={"Ingrese su contraseña"}
                register={register("Password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  minLength: {
                    value: 8,
                    message: "Debe tener al menos 8 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "La contraseña debe contener al menos una letra y un número",
                  },
                })}
                errors={errors}
              />
            </div>

            <div className="input-2c">
              <InputText
                id={"confirmarPassword"}
                label={"Confirmar contraseña"}
                type={"password"}
                required={true}
                placeholder={"Repita su contraseña"}
                register={register("confirmarPassword", {
                  required: {
                    value: true,
                    message: "La confirmación de la contraseña es requerida",
                  },
                  validate: (value) => {
                    if (value === watch("Password")) {
                      return true;
                    } else {
                      return "Las contraseñas no coinciden";
                    }
                  },
                })}
                errors={errors}
              />
            </div>
            <div className="input-4c descripction">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                placeholder="Cuentanos sobre ti"
                name="descripcion"
                className="textAreaDescription"
                {...register("Personal_description", {
                  required: "Este campo es obligatorio",
                  maxLength: {
                    value: 150,
                    message: "Excedió el número máximo de caracteres (150)",
                  },
                  pattern: {
                    value: /^(?!(\S* )\S{21})[a-zA-Z\s]*$/,
                    message: "Cada grupo de 20 caracteres debe contener como máximo un espacio.",
                  },
                  validate: {
                    noRepeatingCharacters: value => !/(.)\1{3}/.test(value) || "No puedes ingresar 4 caracteres iguales seguidos",
                    consonantsAndVowels: value => {
                      for (let i = 0; i < value.length - 3; i++) {
                        const substring = value.substring(i, i + 4);
                        const consonants = substring.match(/[bcdfghjklmnpqrstvwxyz]/gi);
                        const vowels = substring.match(/[aeiou]/gi);
                        if (!consonants || !vowels) {
                          return "Cada grupo de 4 caracteres debe contener al menos una consonante y una vocal.";
                        }
                      }
                      return true;
                    }
                  }
                })}
              ></textarea>
              {errors.Personal_description && (
                <span className="error-message">
                  {errors.Personal_description.message}
                </span>
              )}
            </div>

            <div className="input-1c">
              <SelectOptions
                id={"price"}
                label={"Precio por hora"}
                name={"precio"}
                placeholder={"Elija una tarifa por hora"}
                value={selectedPrice}
                required={true}
                onChange={(e) => setSelectedPrices(e.target.value)}
                options={priceOptions}
                register={register("price", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
                errors={errors}
              />
            </div>
            <div className="input-4c">
              <InterestModal
                onSaveInterests={handleSaveInterests}
                errors={errors}
              />

              {errors.interests && <div className="error-message">Debe seleccionar entre 2 y 10 intereses.</div>}
            </div>
          </div>
          <div className="buttons-section">
            <NavLink to="/">
              <ButtonSecondary label={"Cancelar"} />
            </NavLink>
            <ButtonPrimary type={"submit"} label={"Registrar"} />
          </div>
        </form>
      </div>
    </div>
  );
}
