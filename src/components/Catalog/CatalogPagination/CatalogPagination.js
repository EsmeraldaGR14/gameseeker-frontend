/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./CatalogPagination.css";

function CatalogPagination({ gamesPerPage, games, paginate }) {
  const [number, setNumber] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleGoToPageNumber = (e) => {
    e.preventDefault();
    paginate(number);
  };

  const handleOnChange = (e) => {
    setNumber(e.target.value);
  };

  const goToPage = (plusOrMinus) => {
    if (number < 0) {
      console.log("do nothing", number);
    } else if (plusOrMinus === "minus") {
      setNumber((prevNumber) => {
        const newNumber = prevNumber - 1;
        paginate(newNumber);
        return newNumber;
      });
    } else if (plusOrMinus === "plus") {
      setNumber((prevNumber) => {
        const newNumber = prevNumber + 1;
        paginate(newNumber);
        return newNumber;
      });
    }
  };

  return (
    <nav>
      <div className="pagination-wrapper">
        <button
          className="pagination-button"
          onClick={() => goToPage("minus")}
          disabled={number === 1}
        >
          Previous
        </button>

        <div className="pagination-form-wrapper">
          <form
            className="pagination-form"
            onSubmit={(e) => handleGoToPageNumber(e)}
          >
            <label className="pagination-label" htmlFor="page-number">
              Page
            </label>
            <input
              className="pagination-input"
              type="text"
              id="page-number"
              name="page-number"
              onChange={handleOnChange}
              value={number}
            />
            <button type="submit" className="pagination-input-button">
              GO
            </button>
          </form>
          <p className="pagination-p"> of {pageNumbers.length}</p>
        </div>

        <button
          className="pagination-button"
          onClick={() => goToPage("plus")}
          disabled={number >= pageNumbers.length}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export default CatalogPagination;
