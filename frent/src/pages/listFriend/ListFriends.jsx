import React, { useState, useEffect } from "react";
import "./ListFriend.css";
import { Country, State } from "country-state-city";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import { getFriends, getLikes } from "../../api/register.api";
import InterestModal from "./InterestModal";

export const calculateAge = (birthDate) => {
  const currentDate = new Date();
  const dob = new Date(birthDate);
  let age = currentDate.getFullYear() - dob.getFullYear();
  const monthDiff = currentDate.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};


export default function ListFriend() {
  const [friends, setFriends] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [interestFilter, setInterestFilter] = useState("");
  const [likes, setLikes] = useState([]);
  const [interestFilters, setInterestFilters] = useState([]);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);


  const staticImage =
    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg";

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const res = await getFriends();
        const resLikes = await getLikes();
        setFriends(res.data);
        setLikes(resLikes.data);
      } catch (error) {
        console.error("Error al cargar la lista de amigos:", error);
      }
    };
    loadFriends();
  }, []);


  const formatDescription = (description) => {
    let newDescription = "";

    for (let i = 0; i < description.length; i++) {
      if (i !== 30 && i !== 57) {
        newDescription += description.charAt(i);
      } else if (i >= 57) {
        newDescription += "...";
        break;
      } else {
        newDescription += " " + description.charAt(i);
      }
    }
    return newDescription;
  };

  const getImage = (imageFriend) => {
    if (imageFriend) {
      return `data:image/png;base64,${imageFriend}`;
    }
    return staticImage;
  };

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  console.log(friends);

  const handleCountryChange = (e) => {
    setCountryFilter(e.target.value);
    setCityFilter("");
  };

  

  const filteredFriends = friends.filter((friend) => {
    const fullName = `${friend.first_name} ${friend.last_name}`.toLowerCase();
    const searchQuery = search.toLowerCase();
    const friendAge = calculateAge(friend.birth_date);

    return (
      (friend.first_name.toLowerCase().includes(searchQuery) ||
        friend.last_name.toLowerCase().includes(searchQuery) ||
        fullName.includes(searchQuery)) &&
      (countryFilter === "" || friend.country === countryFilter) &&
      (cityFilter === "" || friend.city === cityFilter) &&
      (genderFilter === "" || friend.gender === genderFilter) &&
      (!ageFilter || (friendAge >= ageFilter.min && friendAge <= ageFilter.max)) &&
      (priceFilter === "" ||
        parseFloat(friend.price) === parseFloat(priceFilter)) &&
        (interestFilters.length === 0 || 
        (friend.interests && interestFilters.every((interest) => friend.interests.includes(interest))))
    );
  });


  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const cityOptions = State.getStatesOfCountry(countryFilter).map((state) => ({
    value: state.isoCode,
    label: state.name && state.name.replace(" Department", ""),
  }));

  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const ageRanges = [
    { label: '18 - 25 años', min: 18, max: 25 },
    { label: '26 - 35 años', min: 26, max: 35 },
    { label: '36 - 45 años', min: 36, max: 45 },
    { label: '46 - 55 años', min: 46, max: 55 },
    { label: '56 - 100 años', min: 56, max: 100 },
  ];

  const handleAgeChange = (e) => {
    const inputAge = e.target.value;
    const selectedRange = ageRanges.find(range => range.label === inputAge);
    if (selectedRange) {
      setAgeFilter(selectedRange);
    } else {
      setAgeFilter('');
    }
  };


  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleInterestChange = (e) => {
    const selectedInterest = e.target.value;
    if (interestFilters.includes(selectedInterest)) {
      setInterestFilters(interestFilters.filter((interest) => interest !== selectedInterest));
    } else {
      setInterestFilters([...interestFilters, selectedInterest]);
    }
  };
  
  const handleToggleInterestModal = () => {
    setShowInterestModal(!showInterestModal);
  };

  const handleInterestSave = (interest, isSelected) => {
    if (isSelected) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    }
  };

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className="list-friend">
      <h1>Lista de amigos</h1>
      <div className="search-filters-container">
        <input
          className="search-input"
          placeholder="Buscar"
          value={search}
          onChange={handleSearchChange}
          type="text"
        />
        {search && (
          <IoMdClose className="icon-list-close" onClick={clearSearch} />
        )}
        <div className="filteres-select">
          <div className="filter-label">
            <label>País:</label>
            <select
              className="filter-select"
              value={countryFilter}
              onChange={handleCountryChange}>
              <option value="">Todos</option>
              {countryOptions.map((country) => (
                <option
                  key={country.value}
                  value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-label">
            <label>Ciudad:</label>
            <select
              className="filter-select"
              value={cityFilter}
              onChange={handleCityChange}>
              <option value="">Todas</option>
              {cityOptions.map((city) => (
                <option
                  key={city.value}
                  value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-label">
            <label>Género:</label>
            <select
              className="filter-select"
              value={genderFilter}
              onChange={handleGenderChange}>
              <option value="">Todos</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
            </select>
          </div>
          <div className="filter-label">
            <label>Edad:</label>
            <select
              className="filter-select"
              value={ageFilter.label}
              onChange={handleAgeChange}
            >
              <option value="">Todos</option>
              {ageRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-label">
            <label >Precio:</label>
            <select
              className="filter-select"
              value={priceFilter}
              onChange={handlePriceChange}>
              <option value="">Todos</option>
              <option value="20.00">20 bs</option>
              <option value="30.00">30 bs</option>
              <option value="40.00">40 bs</option>
              <option value="50.00">50 bs</option>
              <option value="60.00">60 bs</option>
            </select>
          </div>
          <div className="filter-label">
            <label className="filter-label">Intereses:</label>
            <select
              className="filter-select"
              value={interestFilter}
              onChange={handleInterestChange}
              >
              <option value="">Todos</option>
              {likes.map((likes) => (
                <option
                  key={likes.id}
                  value={likes.name}>
                  {likes.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="lista">
        {filteredFriends.map((friend) => (
          <div
            key={friend.id_user}
            className="card">
            <div className="top-card"></div>
            <img
              src={`data:image/png;base64,${friend.image}`}
              alt="foto de perfil"
              onClick={() => openModal(getImage(friend.image))}
            />
            <div className="card-texts">
              <p className="name-card">
                {friend.first_name} {friend.last_name}
              </p>
              <p className="age-card">
                Edad: {calculateAge(friend.birth_date)} años
              </p>
              <p className="subtitle-card">Descripción</p>
              <p className="text-card">
                {formatDescription(friend.personal_description)}
              </p>
              <p>{friend.price} bs.</p>
            </div>
            {/* <NavLink
              className="button-card"
              to={`/rentaForm/${friend.id_user}`}>
              Alquilar
            </NavLink> */}
            <NavLink className="button-card" to={`/profileFriend/${friend.id_user}`}>
              Ver perfil
            </NavLink>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="modalF">
          <div className="modal-content">
            <button
              className="close"
              onClick={closeModal}>
              Cerrar
            </button>
            <img
              src={selectedImage}
              alt="imagen en tamaño grande"
              height="500px"
              width="500px"
            />
          </div>
        </div>
      )}
      {selectedImage && <div className="modal-background"></div>}
    </div>
  );
}
