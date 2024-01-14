import React, { useEffect, useState } from "react";
import { getAllGames } from "../../utilities/Api/Games";
import CatalogGames from "./CatalogGames/CatalogGames";
import CatalogPagination from "./CatalogPagination/CatalogPagination";
import "./Catalog.css";
import Modal from "../../utilities/common/Modal/Modal";
import SortingButtons from "../../utilities/common/SortingButtons/SortingButtons";
import FilterDropdown from "../../utilities/common/FilterDropdown/FilterDropdown";

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

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(24);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedServicesMessage, setSelectedServicesMessage] = useState("");

  useEffect(() => {
    const getAllGamesForTheCatalog = async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          let response = await getAllGames();
          setGames(response);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllGamesForTheCatalog();
  }, []);

  const handleFilter = async () => {
    try {
      let allGames = [...games];
      let message = "";
      if (selectedServices.length > 0) {
        allGames = allGames.filter(
          (game) =>
            Array.isArray(game.subscription) &&
            game.subscription.some((sub) => selectedServices.includes(sub))
        );
        message = `Filtered by ${
          selectedServices.length
        } service(s): ${selectedServices.join(", ")}`;
      }

      setFilteredResults(allGames);
      setSelectedServicesMessage(message);
    } catch (error) {
      console.error("Error filtering games:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleServiceToggle = (service) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];

    setSelectedServices(updatedServices);
  };

  useEffect(() => {
    if (selectedServices.length === 0) {
      setFilteredResults([]);
      setSelectedServicesMessage('');
    } else {
      handleFilter();
    }
  }, [selectedServices]);


  // get currentGames
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = () => {
    setIsModalOpen(true);

    // const modalElement = document.querySelector(".catalog-modal");
    // if (modalElement) {
    //   modalElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    // }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="catalog">
      <div className="container">
        <h1>Catalog</h1>
        <p>
          Explore our Game Catalog for a world of gaming delights! Whether
          you're a seasoned gamer or new to the scene, find thrilling adventures
          and captivating narratives tailored to your preferences. From
          action-packed blockbusters to indie gems, our curated selection has
          something for everyone. Start your gaming journey now!
        </p>

        <div className="sorting-and-filtering">
          <SortingButtons
            games={games}
            setSortedGames={setGames}
            isSearchResults={false}
          />
          <div className="subscription-filter">
            <div className="dropdown">
              <div className="dropdown-title" onClick={toggleDropdown}>
                <span className="filter-title">Filter by Services</span>
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
                        onChange={() => {}}
                      />
                      {service}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedServicesMessage && (
          <div className="selected-services-message">
            {selectedServicesMessage}
          </div>
        )}

        <CatalogGames
          loading={loading}
          currentGames={currentGames}
          filteredResults={filteredResults}
          openModal={openModal}
        />
        <CatalogPagination
          gamesPerPage={gamesPerPage}
          games={games.length}
          paginate={paginate}
        />
      </div>

      {isModalOpen && (
        <Modal
          title="Cannot add to list"
          message="If you want to use this feature please sign up for an account."
          type={"error"}
          onClose={closeModal}
          openModal={openModal}
        />
      )}
    </div>
  );
}

export default Catalog;
