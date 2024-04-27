import React, { useState } from "react";
import "./PhotoFrom.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ButtonSecondary } from "../../components/Buttons/buttonSecondary";
import { ButtonPrimary } from "../../components/Buttons/buttonPrimary";

const Photo = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const location = useLocation();
  const friendData = location.state;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if(!selectedFile) return;

    const fileSize = selectedFile.size / 1024 / 1024;
    const fileType = selectedFile.type;

    if (fileSize > 50) {
      setError("El archivo excede el tamaño máximo permitido (50 MB)");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(fileType)) {
      setError(
        "Formato de archivo no válido. Solo se permiten archivos JPEG, PNG y WEBP."
      );
      return;
    }
    setFile(selectedFile);
    setError("");
    setPreviewUrl(URL.createObjectURL(selectedFile));

    convertImageToBinary(selectedFile);
  };

  const convertImageToBinary = (imageFile) => {
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload= function () {
        const base64String = reader.result.split(",")[1];
      console.log("Datos binarios de la imagen:", base64String);
   }
  };

  const nextPage = async () => {
    if(!file) return; 
    const friendDataNew = {
      ...friendData,
      image: file
    }
      navigate("/addAvailableHours", { state: { friendDataNew } });
  };

const handleRemoveFile = () => {
  setFile(null);
  setPreviewUrl(null);
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
  <div
    className="photo-container"
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    style={{ border: "2px dashed #ccc", padding: "20px" }}
  >
    <h2>Agregar Fotografías</h2>
    <div className="upload-box">
      <i className="fa fa-upload"></i>
      <p>Elija un archivo o arrástrelo y suéltelo aquí</p>
      <p>Formato JPG, PNG, WEBP, hasta 50 MB</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label htmlFor="file-input" className="upload-button">
        Buscar Archivo
        <input
          id="file-input"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
          className="file-input"
          style={{ display: "none" }}
        />
      </label>
      {error && <p className="error-message">{error}</p>}
    </div>
    {file && (
      <div className="preview-box">
        <button onClick={handleRemoveFile} className="remove-button">
          <i className="fas fa-times"></i>
        </button>
        <img
          src={URL.createObjectURL(file)}
          alt="Vista previa"
          className="preview-image"
        />
      </div>
    )}
    <div className="button-section">
      <NavLink to="/friend">
        <ButtonSecondary label="Atras" />
      </NavLink>
      <ButtonPrimary onClick={nextPage} label={"Siguiente"} />
    </div>
  </div>
);
};
export default Photo;
