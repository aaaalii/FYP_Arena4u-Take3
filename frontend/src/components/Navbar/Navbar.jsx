import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
    const isAuthenticated = false;
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

                {isAuthenticated ? (
                    <div>
                        <NavLink>
                            <button className={styles.signOutButton}>
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