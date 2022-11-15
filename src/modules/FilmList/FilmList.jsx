import s from "./FilmList.module.css";

import { genreList } from "../../redux/movies/movies-operations";
import {
  getGenres,
  getMovies,
  getContent,
  getIsLoading,
} from "../../redux/movies/movies-selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FilmModal } from "../FilmModal";
import emptyImg from "../../images/header/img_not_found.jpg";
import { ModalOfContentNotFound } from "../ModalOfContentNotFound/ModalOfContentNotFound";

export const FilmList = ({ setSearchValue, emptyResult, setEmptyResult }) => {
  const dispatch = useDispatch();
  const genres = useSelector(getGenres);
  const movies = useSelector(getMovies);
  console.log(movies);
  const contentFound = useSelector(getContent);
  const isLoading = useSelector(getIsLoading);
  const [showModal, setShowModal] = useState(false);

  const [currentFilm, setCurrentFilm] = useState(null);

  useEffect(() => {
    dispatch(genreList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeny = () => {
    setShowModal(false);
  };

  const onCurrentFilm =
    ({ movie }) =>
    () => {
      setShowModal(true);
      setCurrentFilm(movie);
    };

  return (
    <section className={s.gallery}>
      {contentFound && (
        <>
          {!isLoading ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className={s.photoCard}
                id={movie.id}
                onClick={onCurrentFilm({ movie })}
              >
                <div className={s.galleryItem}>
                  <img
                    className={s.image}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : emptyImg
                    }
                    alt={movie.title}
                    loading="lazy"
                    width="309"
                    height="449"
                  />
                </div>
                <div className={s.info}>
                  <h5 className={s.title}>{movie.title || movie.name}</h5>
                  <div className={s.count}>
                    <p className={s.filmInfo}>
                      {movie.genre_ids.length > 2
                        ? genres
                            .filter((genre) =>
                              movie.genre_ids.includes(genre.id)
                            )
                            .map((genres) => genres.name)
                            .slice(0, 2)
                            .join(", ") + ", Other"
                        : genres
                            .filter((genre) =>
                              movie.genre_ids.includes(genre.id)
                            )
                            .map((genres) => genres.name)
                            .join(",")}
                      <span className={s.slash}>|</span>
                    </p>
                    <p className={s.year}>
                      {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "-"}
                      <span className={s.rate}>{movie.vote_average}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Search....</div>
          )}
        </>
      )}
      {!isLoading && !contentFound && (
        <ModalOfContentNotFound setEmptyResult={setEmptyResult} />
      )}
      {showModal && (
        <FilmModal onDeny={onDeny} movie={currentFilm} genres={genres} />
      )}
    </section>
  );
};
