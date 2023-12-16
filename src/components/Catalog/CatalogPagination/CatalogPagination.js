/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function CatalogPagination({
  gamesPerPage,
  games,
  paginate,
  totalAmountOfPageNumbers,
}) {
  const pageNumbers = [];

  console.log("CatalogPagination:", gamesPerPage, games, paginate);
  for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
    pageNumbers.push(i);
    console.log("pagination:", i);
  }

  totalAmountOfPageNumbers(pageNumbers.length);

  return (
    <nav>
      PAGE NUMBERS :
      <ul className="catalog-pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number},NUMBERS
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CatalogPagination;
