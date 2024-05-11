import "./ProfileUser.css";
import profileImage from "../../assets/img/image.png";

export default function ProfileUser() {
  const user = {
    name: "John Doe",
    age: 30,
    gender: "Masculino",
    location: "New York",
    verified: true,
    description:
      "Skibidi Sigma Pomni Digital Fortnite Chamba Free Gigachad Rizz Ohmygodfloo XXXTentacion Hotmail Lionel Ronaldo Junior Mewing Tercero Chiki Ibai Xocas",
    interests: [
      "Coding",
      "Traveling",
      "Reading",
      "Bombardear naciones",
      "Recuperar el Litoral",
    ],
    price: "40 BOB",
  };

  return (
    <div className="body-page">
      <div className="profile-view">
            <div className="profile-image">
                <img src={profileImage} alt="" />
            </div>

            <div className="profile-description">
                <div className="profile-name">
                    <h3>John henry</h3>
                </div>

                <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
                quaerat rerum excepturi cumque veritatis saepe rem numquam iusto,
                unde accusantium ab dicta sit maxime consequuntur praesentium sunt
                consequatur placeat assumenda.
                </p>  

                <div className="profile-interests">
                {user.interests.map((interest, index) => (
                <span key={index} className="interest">
                    <svg
                    className="tag-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    >
                    <path
                        fill="white"
                        d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"
                    />
                    </svg>
                    {interest}
                </span>
                ))}
          </div>
        </div>
      </div>

      <div className="form-body-container">
        <div className="colums-inputs">
          <div className="input-2c">
            <label htmlFor="">Nombre:</label>
            <p>John</p>
          </div>
          <div className="input-2c">
            <label htmlFor="">Apellido:</label>
            <p>Chavarria</p>
          </div>
          <div className="input-1c">
            <label htmlFor="">Fecha de nacimiento:</label>
            <p>2000-04-05</p>
          </div>
          <div className="input-1c">
            <label htmlFor="">Genero:</label>
            <p>Masculino</p>
          </div>
          <div className="input-1c">
            <label htmlFor="">Pais:</label>
            <p>Bolivia</p>
          </div>
          <div className="input-1c">
            <label htmlFor="">Ciudad:</label>
            <p>Cochabamba</p>
          </div>
          <div className="input-4c">
            <label htmlFor="">Correo electrónico:</label>
            <p>John@gmail.com</p>
          </div>

          <div className="input-1c">
            <label htmlFor="">Precio:</label>
            <p>40.0 Bs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
