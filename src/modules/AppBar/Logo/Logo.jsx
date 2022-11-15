import s from "./Logo.module.css";
import { NavLink } from "react-router-dom";
import filmLogo from "../../../images/header/film.png";
export const Logo = () => {
  return (
    <NavLink className={s.logo} to={"/filmoteka"}>
      <img className={s.img} src={filmLogo} alt="" />
      <p className={s.item}>Filmoteka</p>
    </NavLink>
  );
};
