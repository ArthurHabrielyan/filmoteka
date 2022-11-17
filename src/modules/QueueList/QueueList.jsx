import s from "./QueueList.module.css";

import { getQueue } from "../../redux/movies/movies-selectors";
import { genreList } from "../../redux/movies/movies-operations";
import { getGenres } from "../../redux/movies/movies-selectors";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FilmModal } from "../FilmModal";
export const QueueList = () => {
  const queueFilms = useSelector(getQueue);
  const dispatch = useDispatch();

  const genres = useSelector(getGenres);

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
      {queueFilms &&
        queueFilms.map((movie) => (
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
                  movie.poster_path &&
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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
                        .filter((genre) => movie.genre_ids.includes(genre.id))
                        .map((genres) => genres.name)
                        .slice(0, 2)
                        .join(", ") + ", Other"
                    : genres
                        .filter((genre) => movie.genre_ids.includes(genre.id))
                        .map((genres) => genres.name)
                        .join(",")}
                  <span className={s.slash}>|</span>
                </p>
                <p className={s.year}>
                  {movie.release_date ? movie.release_date.split("-")[0] : "-"}
                  <span className={s.rate}>{movie.vote_average}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      {queueFilms.length === 0 && (
        <p className={s.emptyLibrary}> There are no films added.</p>
      )}
      {showModal && (
        <FilmModal onDeny={onDeny} movie={currentFilm} genres={genres} />
      )}
    </section>
  );
};
