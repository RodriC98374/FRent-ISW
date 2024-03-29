import React from "react";
import "./selectOptions.css";

export function SelectOptions ({ label, id, name, errors, register, required, placeholder, options }) {
    return( 
        <div className="select-component">
            <label htmlFor={id} >
                {label}
                {required && <span className="required">*</span>}
            </label>
            <select
                id={id} 
                name={name}               
                {...register}
                value={register.value || ''}
            >
                <option 
                        value="" 
                        disabled 
                        hidden>
                    {placeholder}
                </option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {errors && errors[id] && <span className="error-message">{errors[id].message}</span>}
        </div>  
    );
}