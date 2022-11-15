import s from "./AppBar.module.css";
import { NavList } from "./NavList";
import { Searcher } from "./Searcher";
import { LibraryButtons } from "./LibraryButtons";
import { useLocation } from "react-router-dom";
export const AppBar = ({
  searchValue,
  setSearchValue,
  onSearchMoviesCb,
  currentPage,
  setEmptyResult,
}) => {
  const location = useLocation();

  return (
    <div
      className={
        location.pathname === "/filmoteka" ? s.content : s.libraryContent
      }
    >
      <div className={s.container}>
        <NavList />
        {location.pathname === "/filmoteka" ? (
          <Searcher
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearchMoviesCb={onSearchMoviesCb}
            currentPage={currentPage}
            setEmptyResult={setEmptyResult}
          />
        ) : (
          <LibraryButtons />
        )}
      </div>
    </div>
  );
};
