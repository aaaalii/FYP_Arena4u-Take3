import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { useSelector } from "react-redux";
import { logout } from '../../api/internal';
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";


function Navbar() {
    const isAuthenticated = useSelector((state) => state.user.auth);

    const dispatch = useDispatch();
    const handleLogOut = async () => {
        await logout();
        dispatch(resetUser());
    };
    return (
        <>
            <nav className={styles.navbar}>
                <NavLink
                    to='/'
                    className={`${styles.logo} ${styles.inActiveStyle}`}>Arena4u</NavLink>

                <NavLink to='/'
                    className={({ isActive }) =>
                        isActive ? styles.activeStyle : styles.inActiveStyle
                    }>Home</NavLink>

                <NavLink to='stadiums'
                    className={({ isActive }) =>
                        isActive ? styles.activeStyle : styles.inActiveStyle
                    }>Book a stadium</NavLink>

                <NavLink to='register-stadium'
                    className={({ isActive }) =>
                        isActive ? styles.activeStyle : styles.inActiveStyle
                    }>Register Stadium</NavLink>

                {isAuthenticated ? (
                    <div>
                        <NavLink>
                            <button className={styles.signOutButton} onClick={handleLogOut}>
                                Sign Out
                            </button>
                        </NavLink>
                    </div>
                ) : (
                    <div>
                        <NavLink
                            to="login"
                            className={({ isActive }) =>
                                isActive ? styles.activeStyle : styles.inActiveStyle
                            }
                        >
                            <button className={styles.logInButton}>Log In</button>
                        </NavLink>

                        <NavLink
                            to="signup"
                            className={({ isActive }) =>
                                isActive ? styles.activeStyle : styles.inActiveStyle
                            }
                        >
                            <button className={styles.signUpButton}>Sign Up</button>
                        </NavLink>
                    </div>
                )}
            </nav>
            <div className={styles.separator}></div>
        </>
    );
}

export default Navbar;