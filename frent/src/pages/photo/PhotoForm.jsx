import React, { useState } from 'react';
import './PhotoFrom.css';
import { NavLink } from 'react-router-dom';
import { ButtonSecondary } from '../../components/Buttons/buttonSecondary';
import { ButtonPrimary } from '../../components/Buttons/buttonPrimary';

const Photo = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const fileSize = selectedFile.size / 1024 / 1024;
        const fileType = selectedFile.type;

        if (fileSize > 50) {
            setError('El archivo excede el tamaño máximo permitido (50 MB)');
            return;
        }

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(fileType)) {
            setError('Formato de archivo no válido. Solo se permiten archivos JPEG, PNG y WEBP.');
            return;
        }

        setFile(selectedFile);
        setError('');
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        handleFileChange({ target: { files: [droppedFile] } });
    };


    return (
        <div className="photo-container" onDragOver={handleDragOver} onDrop={handleDrop} style={{ border: '2px dashed #ccc', padding: '20px' }}>
            <h2>Agregar Fotografías</h2>
            <div className="upload-box">
                <i className="fa fa-upload"></i>
                <p>Elija un archivo o arrástrelo y suéltelo aquí</p>
                <p>Formato JPG, PNG, WEBP, hasta 50 MB</p>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label htmlFor="file-input" className="upload-button">
                    Buscar Archivo
                    <input id="file-input" type="file" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} className="file-input" style={{ display: 'none' }} />
                </label>
                {error && <p className="error-message">{error}</p>}
            </div>
            {file && (
                <div className="preview-box">
                    <button onClick={handleRemoveFile} className="remove-button">
                        <i className="fas fa-times"></i>
                    </button>
                    <img src={URL.createObjectURL(file)} alt="Vista previa" className="preview-image" />
                </div>
            )}
            <div className="button-section">
            <NavLink to= "/friend">
            <ButtonSecondary
              label="Atras"
            />
            </NavLink>
            <NavLink to = "/addAvailableHours">
                <ButtonPrimary
                                label="Siguiente"
                            />
            </NavLink>
            
           </div>
        </div>
    );
}
export default Photo;