import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import s from "./NavList.module.css";

export const NavList = () => {
  return (
    <nav className={s.nav}>
      <Logo />
      <ul className={s.list}>
        <li className={s.listItem}>
          <NavLink className={s.listLink} to={"/home"}>
            Home
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink className={s.listLink} to={"library"}>
            Library
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
