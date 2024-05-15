import { useSelector } from "react-redux";
import { logout } from "../../api/internal";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";
function Navbar() {
  const isAuthenticated = useSelector(state => state.user.auth);
  const isStadiumOwner = useSelector(state => state.user.isStadiumOwner);

  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await logout();
    dispatch(resetUser());
  };

  const [dropDown, setDropDown] = useState(false);

  const showDropdown = () => {
    setDropDown(!dropDown);
  };

  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      // textDecoration: isActive ? 'underline' : 'none',
      // color: isActive ? 'red' : 'white'
    };
  };

  return (
    <nav className="w-full h-24 flex flex-col justify-center items-center bg-slate-700 fixed z-20 border-none">
      <div className="container mx-auto lg:px-6">
        <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <Logo color="white" />
            </div>
          </div>
          <ul className="flex-1 flex justify-center items-center xl:gap-12 gap-x-4 max-lg:hidden">
            <NavLink
              style={navLinkStyle}
              to="/"
              className="leading-normal no-underline text-white text-lg hover:text-primary hover:scale-105 duration-200 ease-in-out"
            >
              Home
            </NavLink>
            <NavLink
              to="stadiums"
              style={navLinkStyle}
              className="leading-normal no-underline flex items-center text-white text-lg hover:text-primary hover:scale-105 duration-200 ease-in"
            >
              Book a stadium
            </NavLink>
            <NavLink
              to="register-stadium"
              style={navLinkStyle}
              className="leading-normal no-underline flex items-center text-white text-lg hover:text-primary hover:scale-105 duration-200 ease-in"
            >
              Register stadium
            </NavLink>
            {isStadiumOwner && (
              <NavLink
                to="my-stadiums" // Update the route path as needed
                className="leading-normal no-underline text-white text-lg hover:text-primary hover:scale-105 duration-200 ease-in"
              >
                My stadiums
              </NavLink>
            )}
            <NavLink
              to="my-bookings"
              style={navLinkStyle}
              className={`leading-normal no-underline text-white text-lg hover:text-primary hover:scale-105 duration-200 ease-in`}
            >
              My bookings
            </NavLink>
          </ul>

          {isAuthenticated ? (
            <div className="flex jus max-lg:hidden">
              <button
                onClick={handleSignOut}
                className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-4 py-3 hoverBtn"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex max-lg:hidden">
              <NavLink
                to="login"
                className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-4 py-3 hoverBtn"
              >
                Login
              </NavLink>
              <NavLink
                to="signup"
                className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-4 py-3 hoverBtn"
              >
                Signup
              </NavLink>
            </div>
          )}

          {dropDown ? (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-white"
            >
              <MdClose />
            </div>
          ) : (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-white"
            >
              <HiMenuAlt3 />
            </div>
          )}
        </div>
        {dropDown ? (
          <div
            onClick={showDropdown}
            className="lg:hidden w-full h-[100vh] fixed top-24 bg-black ease-in-out duration-100"
          >
            <div className="w-full h-[320px] flex flex-col items-baseline pt-8 gap-4">
              <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8">
                <NavLink
                  to="/"
                  className="leading-normal no-underline text-white text-lg hover:text-primary"
                >
                  Home
                </NavLink>
                <NavLink
                  to="stadiums"
                  className="leading-normal no-underline flex items-center text-white text-lg hover:text-primary"
                >
                  Book a stadium
                </NavLink>
                <NavLink
                  to="register-stadium"
                  className="leading-normal no-underline flex items-center text-white text-lg hover:text-primary"
                >
                  Register staium
                </NavLink>
                <NavLink
                  to="my-bookings"
                  className="leading-normal no-underline text-white text-lg hover:text-primary"
                >
                  My bookings
                </NavLink>
              </ul>
              <div className="flex justify-center w-full">
                <button className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-8 py-3 hoverBtn ml-2">
                  Login
                </button>
                <button className="rounded-full border border-solid border-primary bg-transparent text-lg text-white px-8 py-3 hoverBtn">
                  Signup
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
