/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

function CatalogPagination({ gamesPerPage, games, paginate }) {
  const [number, setNumber] = useState(1);
  const pageNumbers = [];

  // console.log("CatalogPagination:", Math.ceil(games / gamesPerPage));

  for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
    pageNumbers.push(i);
    // console.log("pagination:", i);
  }

  // setTotalAmountOfPageNumbers(pageNumbers.length);

  const handleGoToPageNumber = (e) => {
    e.preventDefault();
    console.log(e);
    paginate(number);
  };

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setNumber(e.target.value);
  };

  return (
    <nav>
      <div>
        <button
          onClick={() => {
            console.log("previous was clicked", number);
            setNumber(1);
          }}
        >
          Previous
        </button>
        <p> page </p>

        <form onSubmit={(e) => handleGoToPageNumber(e)}>
          {/* handle error where the user is not able to input a number higher than the amount of pages available */}
          <input
            type="text"
            id="page-number"
            name="page-number"
            onChange={handleOnChange}
            value={EventTarget.value}
          ></input>
          <label htmlFor="page-number">GO</label>
        </form>

        <p> of {pageNumbers.length}</p>
        <button
          onClick={() => {
            setNumber(number + 1);
          }}
        >
          Next
        </button>
      </div>
      PAGE NUMBERS :
      <ul className="catalog-pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CatalogPagination;
