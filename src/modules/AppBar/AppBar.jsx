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
}) => {
  const location = useLocation();
  console.log(location.pathname);
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
            setSearchValue={setSearchValue}
            onSearchMoviesCb={onSearchMoviesCb}
            currentPage={currentPage}
          />
        ) : (
          <LibraryButtons />
        )}
      </div>
    </div>
  );
};
