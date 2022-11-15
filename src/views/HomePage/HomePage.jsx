import { AppBar } from "../../modules/AppBar";
import { useEffect, useState } from "react";
import {
  onPopularMovies,
  onMovieSearch,
} from "../../redux/movies/movies-operations";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, getContent } from "../../redux/movies/movies-selectors";
import { FilmList } from "../../modules/FilmList";
import ReactPaginate from "react-paginate";

import s from "./HomePage.module.css";
import { useCallback } from "react";
export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [emptyResult, setEmptyResult] = useState(false);
  console.log(emptyResult);
  const contentFound = useSelector(getContent);
  const moviesState = useSelector(getMovies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onPopularMovies(currentPage)).then((data) =>
      setTotalPosts(data.payload.total_pages)
    );

    dispatch(onPopularMovies(currentPage));
  }, []);

  const onSearchMoviesCb = useCallback(
    (currentPage, query) => {
      dispatch(onMovieSearch({ currentPage, query }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, searchValue]
  );

  // useEffect(() => {
  //   searchValue && onSearchMoviesCb(currentPage, searchValue);
  // }, [currentPage, searchValue]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage + 1);
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
