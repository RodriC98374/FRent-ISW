import {useForm} from "react-hook-form"
import { ButtonPrimary } from "../../Buttons/buttonPrimary";
import { ButtonSecondary } from "../../Buttons/buttonSecondary";
import { InputText } from "../Inputs/inputText";
import { SelectOptions } from "../Selects/selectOptions";
import { useState, useEffect } from "react";
import axios from "axios";


import "./test.css";

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

    const options = [
        { value: "masculino", label: "Masculino" },
        { value: "femenino", label: "Femenino" },
        { value: "noIndicado", label: "Prefiero no decirlo" }
    ];
    
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await axios.get("https://restcountries.com/v3.1/all");
            setCountries(response.data); // Asignar la lista de países al estado
        };

        fetchCountries();
    }, []);

    console.log(countries);

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
                            required={true}
                            options={options}
                            register={register("genero", {
                                required:{
                                    value: true,
                                    message:"Campo requerido"
                                }})}
                            errors={errors}
                        />
                    </div>
                    <div className="input-1c">
                        <SelectOptions
                            id={"pais"}
                            label={"País"}
                            name={"pais"}
                            placeholder={"Elija un país"}
                            required={true}
                            options={options}
                            register={register("pais", {
                                required:{
                                    value: true,
                                    message:"Campo requerido"
                                }})}
                            errors={errors}
                        />
                    </div>
                </div>
                <div className="buttons-section">
                    <ButtonSecondary label={"Cancelar"}/>
                    <ButtonPrimary type={"submit"} label={"Registrarse"}/>
                </div>
            </form>
        </div>
    )
}