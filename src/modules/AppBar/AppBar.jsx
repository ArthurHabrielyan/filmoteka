import { NavList } from "./NavList";
import s from "./AppBar.module.css";
import { Searcher } from "./Searcher";
export const AppBar = () => {
  return (
    <div className={s.content}>
      <div className={s.container}>
        <NavList />
        <Searcher />
      </div>
    </div>
  );
};
