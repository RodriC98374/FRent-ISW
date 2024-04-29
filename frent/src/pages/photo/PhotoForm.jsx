import React, { useState, useEffect } from "react";
import "./PhotoFrom.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ButtonSecondary } from "../../components/Buttons/buttonSecondary";
import { ButtonPrimary } from "../../components/Buttons/buttonPrimary";

const Photo = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageBinary, setImageBinary] = useState("");
  const location = useLocation();
  const friendData = location.state;

  useEffect(() => {
    const storedImageData = localStorage.getItem("imageData");
    if (storedImageData) {
      const { fileName, fileType, imageBinary } = JSON.parse(storedImageData);
      const fileData = new File([base64ToArrayBuffer(imageBinary)], fileName, { type: fileType });
      setFile(fileData);
      setImageBinary(imageBinary);
      setPreviewUrl(`data:image/jpeg;base64,${imageBinary}`);
      setError(""); // Reset error message
    }
  }, []);

  useEffect(() => {
    if (file && imageBinary) {
      const imageData = { fileName: file.name, fileType: file.type, imageBinary };
      localStorage.setItem("imageData", JSON.stringify(imageData));
    }
  }, [file, imageBinary]);
  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const fileSize = selectedFile.size / 1024 / 1024;
    const fileType = selectedFile.type;
    if (fileSize > 50) {
      setError("El archivo excede el tamaño máximo permitido (50 MB)");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(fileType)) {
      setError("Formato de archivo no válido. Solo se permiten archivos JPEG, PNG y WEBP.");
      return;
    }
    setFile(selectedFile);
    setError(""); // Reset error message
    setPreviewUrl(URL.createObjectURL(selectedFile));
    convertImageToBinary(selectedFile);
  };

  const convertImageToBinary = (imageFile) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(imageFile);
    reader.onload = () => {
      const base64String = arrayBufferToBase64(reader.result);
      setImageBinary(base64String);
    };
  };

  const nextPage = async () => {
    if (!file) return;
    const friendDataNew = { ...friendData, image: imageBinary };
    navigate("/addAvailableHours", { state: { friendDataNew } });
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setImageBinary("");
    localStorage.removeItem("imageData");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFileChange({ target: { files: [droppedFile] } });
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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
      {previewUrl && (
        <div className="preview-box">
          <button onClick={handleRemoveFile} className="remove-button">
            <i className="fas fa-times"></i>
          </button>
          <img
            src={previewUrl}
            alt="Vista previa"
            className="preview-image"
          />
        </div>
      )}
      <div className="button-section">
        <NavLink to="/friend">
          <ButtonSecondary label="Atras" />
        </NavLink>
        <ButtonPrimary onClick={nextPage} label={"Siguiente"} disabled={!file} />
      </div>
    </div>
  );
};

export default Photo;