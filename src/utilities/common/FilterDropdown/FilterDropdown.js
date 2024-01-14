import React, { useState, useEffect } from "react";
import "./FilterDropdown.css";
import Nvidia from "/Users/irfan/Desktop/gameseeker-frontend/src/components/Font-assets/nvidia.png"
import { BsNvidia } from "react-icons/bs";
import { SiUbisoft } from "react-icons/si";
import { BsNintendoSwitch } from "react-icons/bs";

function FilterDropdown({ games, setFilteredResults }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const subscriptionServices = [
    "PlayStation Plus Essential",
    "PlayStation Plus Extra",
    "PlayStation Plus Premium",
    "Xbox Game Pass Core",
    "Xbox Game Pass",
    "PC Game Pass",
    // "Nvidia GeForce Now",
    // "Nintendo Switch Online",
    // "Ubisoft+",
    "Apple Arcade",
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleServiceToggle = (service) => {
    setSelectedServices((prevServices) => {
      if (prevServices.includes(service)) {
        return prevServices.filter((s) => s !== service);
      } else {
        return [...prevServices, service];
      }
    });
  };

  const getIconClass = (subscription) => {
    // Add mappings for other services
    if (subscription.includes("PlayStation")) {
      return "fab fa-playstation";
    }
    if (subscription.includes("Game Pass")) {
      return "fab fa-xbox";
    }
    // if (subscription.includes("Nvidia")) {
    //   return "nvidia-icon";
    // }
    // if (subscription.includes("Nintendo")) {
    //   return "fab fa-nintendo";
    // }
    // if (subscription.includes("Ubisoft")) {
    //   return "fab fa-ubisoft";
    // }
    if (subscription.includes("Apple")) {
      return "fab fa-apple";
    }
    // Default icon class
    return "fab fa-default";
  };


  const handleFilter = () => {
    try {
      let filteredGames = [...games];
      if (selectedServices.length > 0) {
        filteredGames = filteredGames.filter(
          (game) =>
            Array.isArray(game.subscription) &&
            game.subscription.some((sub) => selectedServices.includes(sub))
        );
      }

      setFilteredResults(filteredGames);
      console.log(filteredGames);
    } catch (error) {
      console.error("Error filtering games:", error);
    }
  };

  // useEffect(() => {
  //   if (selectedServices.length === 0) {
  //     setFilteredResults([]);
  //   } else {
  //     handleFilter();
  //   }
  // }, [selectedServices]);

  return (
    <form id="app-cover">
      <div id="select-box">
        <input type="checkbox" id="options-view-button"></input>
        <div id="select-button" className="brd">
          <div id="selected-value">
            <span>Filter by Services</span>
          </div>
          <div id="chevrons">
            <i className="fas fa-chevron-up"></i>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        <div id="options">
          {subscriptionServices.map((service, index) => (
            <div className="option" key={index}>
              <input
                className="s-c top"
                type="checkbox"
                id={`service-${index}`}
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceToggle(service)}
              />
              <input
                className="s-c bottom"
                type="checkbox"
                id={`service-${index}`}
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceToggle(service)}
              />
              <label htmlFor={`service-${index}`}>
                <i className={getIconClass(service)}></i>
                <span className="label">{service}</span>
                <span className="opt-val">{service}</span>
              </label>
            </div>
          ))}
          <div className="option">
            <input
              className="s-c top"
              type="checkbox"
              name="platform"
              value="codepen"
            ></input>
            <input
              className="s-c bottom"
              type="checkbox"
              name="platform"
              value="codepen"
            ></input>
            <div className="button-icon-container">
              <BsNvidia />
              <span className="nvidia-label">Nvidia</span>
              <span className="opt-val">Nvidia</span>
            </div>
          </div>
          <div className="option">
            <input
              className="s-c top"
              type="checkbox"
              name="platform"
              value="codepen"
            ></input>
            <input
              className="s-c bottom"
              type="checkbox"
              name="platform"
              value="codepen"
            ></input>
            <div className="button-icon-container">
              <SiUbisoft />
              <span className="nvidia-label">Ubisoft+</span>
              <span className="opt-val">Ubisoft+</span>
            </div>
          </div>
          <div className="option">
            <input
              className="s-c top"
              type="checkbox"
              name="platform"
              value="codepen"
            ></input>
            <input
              className="s-c bottom"
              type="checkbox"
              name="platform"
              value="codepen"
            ></input>
            <div className="button-icon-container">
              <BsNintendoSwitch />
              <span className="nvidia-label">Nintendo Switch Online</span>
              <span className="opt-val">Nintendo</span>
            </div>
          </div>
          <div id="option-bg"></div>
        </div>
      </div>
    </form>
  );
}


export default FilterDropdown;
