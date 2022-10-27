import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import s from "./NavList.module.css";

const linkStyle = {
  borderBottom: "none",
};

const activeLinkStyle = {
  borderBottom: "2px solid #ff6b08",
  paddingBottom: "5px",
};

export const NavList = () => {
  return (
    <nav className={s.nav}>
      <Logo />
      <ul className={s.list}>
        <li className={s.listItem}>
          <NavLink
            className={s.listLink}
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            to={"/filmoteka"}
          >
            Home
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink
            className={s.listLink}
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            to={"/library"}
          >
            Library
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
