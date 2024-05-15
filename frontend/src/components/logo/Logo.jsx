import { NavLink } from "react-router-dom";
import styles from "./logo.module.css";
export default function Logo(props) {
  return (
    <div className="main">
      <span>
        <NavLink
          to="/"
          className={`${styles.logo} ${styles.inActiveStyle} font-semibold text-${props.color} text-lg leading-tight`}
        >
          Arena4U
          <p className="text-primary text-sm">Play & Fun</p>
        </NavLink>
      </span>
    </div>
  );
}
