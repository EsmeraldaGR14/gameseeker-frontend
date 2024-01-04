import React, { useState, useEffect } from "react";
import "./FilterDropdown.js";

const subscriptionServices = [
  "PlayStation Plus Essential",
  "PlayStation Plus Extra",
  "PlayStation Plus Premium",
  "Xbox Game Pass Core",
  "Xbox Game Pass",
  "PC Game Pass",
  "GeForce Now",
  "Nintendo Switch Online",
  "Ubisoft+",
  "Apple Arcade",
];

function FilterDropdown({ games, setFilteredResults }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

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
    <div className="subscription-filter">
      <div className="dropdown">
        <div className="dropdown-title" onClick={toggleDropdown}>
          <span>
            {selectedServices.length === 0
              ? "Select Services"
              : selectedServices.join(", ")}
          </span>
          <span className={`arrow ${isDropdownOpen ? "up" : "down"}`}>
            {isDropdownOpen ? "\u25B2" : "\u25BC"}
          </span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-options">
            {subscriptionServices.map((service) => (
              <div
                key={service}
                className="option"
                onClick={() => handleServiceToggle(service)}
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                {service}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterDropdown;
