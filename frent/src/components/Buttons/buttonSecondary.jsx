import React from "react";
import "./buttonSecondary.css";

export function ButtonSecondary ({OnClick, label, type}) {
    return(
        <div className="secondary-button">
            <button OnClick={OnClick} type={type}>
                {label}
            </button>
        </div>
    );
}

