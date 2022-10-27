import { debounce } from "debounce";
import s from "./Searcher.module.css";

export const Searcher = ({ searchValue, setSearchValue }) => {
  const onSearchMovies = (e) => {
    const { value } = e.target;
    debounce(console.log(value), 200);
    setSearchValue(value);
  };

  // const onDebounceSearch = debounce(onSearchMovies, 250);

  return (
    <form className={s.searchForm} id="search-form">
      <div className={s.wrap}>
        <input
          className={s.input}
          type="text"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search movies..."
          value={searchValue}
          onChange={onSearchMovies}
        />
        <button className={s.searchBtn} type="submit">
          <svg
            className={s.searchSvg}
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 9.5C7.70914 9.5 9.5 7.70914 9.5 5.5C9.5 3.29086 7.70914 1.5 5.5 1.5C3.29086 1.5 1.5 3.29086 1.5 5.5C1.5 7.70914 3.29086 9.5 5.5 9.5Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 10.5002L8.32495 8.3252"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={s.emptyResult}></div>
      </div>
    </form>
  );
};
