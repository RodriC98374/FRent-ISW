import {useForm} from "react-hook-form"
import { ButtonPrimary } from "../../Buttons/buttonPrimary";
import { ButtonSecondary } from "../../Buttons/buttonSecondary";
import { InputText } from "../Inputs/inputText";
import { SelectOptions } from "../Selects/selectOptions";
import { useState } from "react";
import { Country, State } from "country-state-city";

import "./test.css";
import InterestModal from "../Interests/interestSection";


export function Test() {
    const {register, handleSubmit,
        formState: {errors},
        watch, 
        setValue,
        reset
    } = useForm();

    const onSubmit  = handleSubmit ((data) => {
        console.log(data)
        alert("Envio correcto de datos")
        setValue('correo', '')
        reset()
        //  send data to server here
    
    });

    const optionsGender = [
        { value: "masculino", label: "Masculino" },
        { value: "femenino", label: "Femenino" },
        { value: "noIndicado", label: "Prefiero no decirlo" }
    ];

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [states, setStates] = useState([]);

    const [selectedGender, setSelectedGender] = useState("");

    const handleCountryChange = (e) => {
        const selectedCountryIsoCode = e.target.value;
        setSelectedCountry(selectedCountryIsoCode);
        const states = State.getStatesOfCountry(selectedCountryIsoCode);
        setStates(states);
        // Limpia el estado seleccionado cuando se cambia el país
        setSelectedState("");
        // Actualizar el valor en el formulario
        setValue("pais", selectedCountryIsoCode);
        console.log(states);
    };

    const handleStateChange = (e) => {
        const selectedStateIsoCode = e.target.value;
        setSelectedState(selectedStateIsoCode);
        // Actualizar el valor en el formulario
        setValue("estado", selectedStateIsoCode);
    };

    return(
        <div className="form-body-container">
            <h3>Datos Personales</h3>
            <form action="" id="formulario-cliente" onSubmit={onSubmit}>
                <div className="colums-inputs">
                    <div className="input-2c">
                        <InputText
                            id={"nombre"}
                            label={"Nombre(s)"}
                            type={"text"}
                            required={true}
                            placeholder={"Ingrese su(s) nombre(s)"}
                            register={register("nombre", {
                                required: {
                                    value: true,
                                    message: "El nombre es requerido"
                                }, 
                                minLength: {
                                    value: 2,
                                    message: "El nombre debe tener al menos 2 caracteres"
                                },
                                maxLength: {
                                    value: 20, 
                                    message: "Demaciados caracteres"
                                }
                                
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-2c">
                        <InputText
                            id={"apellido"}
                            label={"Apellido(s)"}
                            type={"text"}
                            required={true}
                            placeholder={"Ingrese su(s) apellido(s)"}
                            register={register("apellido", {
                                required: {
                                    value: true,
                                    message: "El apellido es requerido"
                                }, 
                                minLength: {
                                    value: 2,
                                    message: "El apellido debe tener al menos 2 caracteres"
                                },
                                maxLength: {
                                    value: 20, 
                                    message: "Demaciados caracteres"
                                }
                                
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-1c">
                        <InputText
                            id={"fechaNacimiento"}
                            label={"Fecha Nacimiento"}
                            type={"date"}
                            required={true}
                            placeholder={"DD/MM/AA"}
                            register={register("fechaNacimiento", {
                                required: {
                                    value: true,
                                    message: "Fecha de nacimiento requerida",
                                },
                                validate: (value) => {
                                    const fechaNacimiento = new Date(value);
                                    const fechaActual = new Date();
                                    const edad = 
                                    fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                                    if(edad >= 18 ){
                                        return  true;
                                    }else{
                                        return "Debe ser mayor de edad";
                                    }
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-1c">
                        <SelectOptions
                            id={"genero"}
                            label={"Género"}
                            name={"genero"}
                            placeholder={"Elija su género"}
                            value={selectedGender}
                            required={true}
                            options={optionsGender}
                            register={register("genero", {
                                required:{
                                    value: true,
                                    message:"Campo requerido"
                                }})}
                            errors={errors}
                            onChange={(e) => setSelectedGender(e.target.value)} 
                        />
                    </div>
                    <div className="input-1c">
                        <SelectOptions
                            className="pais-select"
                            id={"pais"}
                            label={"País"}
                            name={"pais"}
                            placeholder={"Elija un país"}
                            value={selectedCountry}
                            required={true}
                            onChange={handleCountryChange} // Manejador de cambio de selección
                            options={Country.getAllCountries().map(country => ({
                                value: country.isoCode,
                                label: country.name
                            }))}
                            register={register("pais", {
                                required:{
                                    value: true,
                                    message:"Campo requerido"
                            }})}
                            errors={errors}
                        />
                    </div>
                    <div className="input-1c">
                        <SelectOptions
                            id={"ciudad"}
                            label={"Ciudad"}
                            name={"ciudad"}
                            placeholder={"Elija una ciudad"}
                            value={selectedState}
                            required={true}
                            onChange={handleStateChange}
                            options={
                                states.map(state => ({
                                    value: state.isoCode,
                                    label: state.name && state.name.replace(" Department", "")        
                                }))
                            }
                            register={register("ciudad", {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-4c">
                        <InputText
                            id={"correo"}
                            label={"Correo electrónico"}
                            type={"email"}
                            required={true}
                            placeholder={"Ingrese su correo electrónico"}
                            register={register("correo", {
                                required: {
                                    value: true,
                                    message: "El Correo es requerido"
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                    message: "Formato de email invalido"
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-2c">
                        <InputText
                            id={"password"}
                            label={"Contraseña"}
                            type={"password"}
                            required={true}
                            placeholder={"Ingrese su contraseña"}
                            register={register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida",
                                minLength:{
                                    value: 8,
                                    message: "Debe tener al menos 8 caracteres"
                                    }
                                }
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
                                        message: "La confirmación de la contraseña es requerida"
                                    },
                                    validate: (value) => {
                                        if(value === watch('password')){
                                            return true;
                                        }else{
                                            return "Las contraseñas no coinciden";
                                        }
                                    }
                                })}
                                errors={errors}
                            />
                    </div>
                    <div className="input-4c descripction">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea name="descripcion" className="textAreaDescription"
                        {...register("descripcion",{ 
                            required:{
                                value:false
                            }
                            ,maxLength:{
                            value: 500,
                            message: "Numero de caracteres excedido"
                        }})}
                        
                        ></textarea>
                        {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
                    </div>
                    {/* <div className="input-2c">
                        <InputText
                            id={"gustos"}
                            label={"Gustos e Intereses"}
                            type={"text"}
                            placeholder={"Añada sus gustos e intereses"}
                            register={register("gustos", 
                                {required: true})}
                            errors={errors}
                        />
                    </div> */}
                    {/*intereses */}
                    <div className="input-4c">
                        <InterestModal/>
                    </div>
                </div>
                <div className="buttons-section">
                    <ButtonSecondary label={"Cancelar"}/>
                    <ButtonPrimary type={"submit"} label={"Registrarse"}/>
                </div>
                {/* <pre>
                    {JSON.stringify(watch(), null, 2)},
                </pre> */}
            </form>
        </div>
    )
}