import React, { useState } from 'react';
import './PhotoFrom.css';

const Photo = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        // Aquí deberías implementar la lógica para subir el archivo al servidor
        // Puedes utilizar una biblioteca como axios para realizar la solicitud HTTP
        console.log('Subiendo archivo:', file);
    };

    return (
        <div className="photo-container">
            <div className="upload-box">
                <input type="file" onChange={handleFileChange} className="file-input" />
                <button onClick={handleUpload} className="upload-button">
                    Subir Foto
                </button>
            </div>
            <div className="preview-container">
                {file && (
                    <div className="preview-box">
                        <img src={URL.createObjectURL(file)} alt="Preview" className="preview-image" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Photo;