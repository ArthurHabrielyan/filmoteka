import s from "./LibraryButtons.module.css";
import { NavLink } from "react-router-dom";

const activeLinkStyle = {
  boxShadow: "0px 8px 43px rgba(255, 107, 1, 0.6)",
  backgroundColor: "#ff6b01",
  border: "none",
};

const linkStyle = {};

export const LibraryButtons = () => {
  return (
    <ul className={s.buttonList}>
      <li className={s.buttonItem}>
        <NavLink
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
          className={s.button}
          to={"/library/watched"}
        >
          Watched
        </NavLink>
      </li>
      <li className={s.buttonItem}>
        <NavLink
          style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
          className={s.button}
          to={"/library/queue"}
        >
          Queue
        </NavLink>
      </li>
    </ul>
  );
};
