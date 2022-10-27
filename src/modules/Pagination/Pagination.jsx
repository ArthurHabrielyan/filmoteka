import { useState } from "react";

export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  startIndex,
  endIndex,
  setStartIndex,
  setEndIndex,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const buttonGoBack = () => () => {
    setStartIndex((prevState) => prevState - 1);
    setEndIndex((prevState) => prevState - 1);
  };

  const buttonGoNext = () => () => {
    setStartIndex((prevState) => prevState + 1);
    setEndIndex((prevState) => prevState + 1);
  };

  return (
    <nav>
      <button onClick={buttonGoBack()}>«</button>
      <ul className="pagination">
        {pageNumbers.slice(startIndex, endIndex).map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className="page-item page-link"
          >
            {number}
          </li>
        ))}
      </ul>
      <button onClick={buttonGoNext()}>»</button>
    </nav>
  );
};
