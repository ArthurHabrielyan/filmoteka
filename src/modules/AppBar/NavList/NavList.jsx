import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import s from "./NavList.module.css";
import { useLocation } from "react-router-dom";

const linkStyle = {
  borderBottom: "none",
};

const activeLinkStyle = {
  borderBottom: "2px solid #ff6b08",
  paddingBottom: "5px",
};

export const NavList = () => {
  const location = useLocation();

  return (
    <nav className={s.nav}>
      <Logo />
      <ul className={s.list}>
        <li className={s.listItem}>
          <NavLink
            className={s.listLink}
            style={({ isActive }) =>
              location.pathname === "/" && isActive
                ? activeLinkStyle
                : linkStyle
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink
            className={s.listLink}
            style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            to={"/library/watched"}
          >
            Library
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
