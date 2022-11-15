import s from "./ModalOfContentNotFound.module.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { onPopularMovies } from "../../redux/movies/movies-operations";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export const ModalOfContentNotFound = ({ setEmptyResult }) => {
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    setEmptyResult(false);

    if (e.keyCode === 13) {
      onDeny();
      return;
    }
    onDeny();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const onDeny = () => {
    dispatch(onPopularMovies(1));
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onDeny();
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <p className={s.textOfModal}>No movies found for this query</p>
        <button className={s.button} onClick={handleKeyDown}>
          Ok
        </button>
      </div>
    </div>,
    modalRoot
  );
};
