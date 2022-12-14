import s from "./HomePage.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import {
  onPopularMovies,
  onMovieSearch,
} from "../../redux/movies/movies-operations";
import { AppBar } from "../../modules/AppBar";
import { getMovies, getContent } from "../../redux/movies/movies-selectors";
import { FilmList } from "../../modules/FilmList";

export const HomePage = () => {
  const dispatch = useDispatch();

  const contentFound = useSelector(getContent);
  const moviesState = useSelector(getMovies);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [emptyResult, setEmptyResult] = useState(false);

  useEffect(() => {
    dispatch(onPopularMovies(currentPage)).then((data) =>
      setTotalPosts(data.payload.total_pages)
    );
    dispatch(onPopularMovies(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchMoviesCb = useCallback(
    (currentPage, query) => {
      dispatch(onMovieSearch({ currentPage, query }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, searchValue]
  );

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage + 1);
    searchValue
      ? onSearchMoviesCb(currentPage, searchValue)
      : dispatch(onPopularMovies(currentPage));
  };
  const pageCount = Math.ceil(totalPosts / moviesState.length);

  return (
    <>
      <AppBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchMoviesCb={onSearchMoviesCb}
        currentPage={currentPage}
        setEmptyResult={setEmptyResult}
      />
      <FilmList
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        emptyResult={emptyResult}
        setEmptyResult={setEmptyResult}
      />
      {contentFound && (
        <ReactPaginate
          previousLabel={"<"}
          previousClassName={s.arrowPrevious}
          previousLinkClassName={s.arrowLink}
          nextLabel={">"}
          nextClassName={s.arrowNext}
          nextLinkClassName={s.arrowLink}
          breakLabel={"..."}
          breakClassName={s.dots}
          breakLinkClassName={s.dotsLink}
          className={s.pagination}
          pageClassName={s.pagination__page}
          pageLinkClassName={s.pageLink}
          pageCount={!isNaN(pageCount) && pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={s.active}
          activeLinkClassName={s.currentPageLink}
        />
      )}
    </>
  );
};
