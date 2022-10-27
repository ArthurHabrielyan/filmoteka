import s from "./FilmModal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import emptyImg from "../../images/header/img_not_found.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getWatched, getQueue } from "../../redux/movies/movies-selectors";
import { movieActions } from "../../redux/movies/movies-slice";

const modalRoot = document.querySelector("#modal-root");

export const FilmModal = ({ onDeny, movie, genres }) => {
  const dispatch = useDispatch();
  const watchedFilms = useSelector(getWatched);
  const queueFilms = useSelector(getQueue);

  const onWatchedChange = (movie) => {
    watchedFilms !== null && watchedFilms.find((film) => film.id === movie.id)
      ? dispatch(movieActions.deleteFromWatched(movie))
      : dispatch(movieActions.addToWatched(movie));
  };

  const onQueueChange = (movie) => {
    queueFilms !== null && queueFilms.find((film) => film.id === movie.id)
      ? dispatch(movieActions.deleteFromQueue(movie))
      : dispatch(movieActions.addToQueue(movie));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onDeny();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onDeny();
    }
  };

  const genresOfCurrentFilm = genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genres) => genres.name)
    .join(",");

  let poster = emptyImg;
  if (movie.poster_path) {
    poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button type="exit" className={s.closeBtn}>
          <svg
            onClick={handleBackdropClick}
            className={s.closeIcon}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              onClick={handleBackdropClick}
              d="M8 8L22 22"
              stroke="black"
              strokeWidth="2"
            />
            <path
              onClick={handleBackdropClick}
              d="M8 22L22 8"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </button>
        <div className={s.infoTotal}>
          <div className={s.modalInfo}>
            <div className={s.imageBlock}>
              <img
                className={s.image}
                src={poster}
                width="240px"
                height="357px"
                alt={movie.original_title}
              />
            </div>

            <div className={s.info}>
              <h2 className={s.title}>{movie.title || movie.name}</h2>

              <ul className={s.list}>
                <li className={s.item}>
                  <div className={s.categoryInfo}>Vote / Votes</div>
                  <div className={`${s.infoValue} ${s.voteValue}`}>
                    <div className={s.infoRating}>
                      <span>{movie.vote_average}</span>
                    </div>
                    <span className={s.infoLine}>/</span>
                    <div className={s.infoVotes}>
                      <span>10</span>
                    </div>
                  </div>
                </li>
                <li className={s.item}>
                  <div className={s.categoryInfo}>Popularity</div>
                  <div className={s.infoValue}>{movie.popularity}</div>
                </li>
                <li className={s.item}>
                  <div className={s.categoryInfo}>Original Title</div>
                  <div className={`${s.infoValue} ${s.origTitle}`}>
                    {movie.title || movie.name}
                  </div>
                </li>
                <li className={s.item}>
                  <div className={s.categoryInfo}>Genre</div>
                  <div className={s.infoValue}>{genresOfCurrentFilm}</div>
                </li>
              </ul>

              <h3 className={s.titleDisc}>About</h3>
              <p className={s.modalDisc}>{movie.overview}</p>

              <div className={s.buttons}>
                <button
                  type="button"
                  value="watched"
                  onClick={() => onWatchedChange(movie)}
                  className={`${s.modalButton} ${s.buttonWatch}`}
                >
                  {watchedFilms.find((film) => film.id === movie.id)
                    ? "delete from watched"
                    : "add to watched"}
                </button>

                <button
                  type="button"
                  value="queue"
                  onClick={() => onQueueChange(movie)}
                  className={`${s.modalButton} ${s.buttonQueue}`}
                >
                  {queueFilms.find((film) => film.id === movie.id)
                    ? "delete from queue"
                    : "add to queue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
