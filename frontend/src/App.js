import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Signup from "./pages/SignUp/SignUp";
import Protected from "./components/Protected/Protected";
import RegisterStadium from "./pages/Register Stadium/RegisterStadium";
import Stadiums from "./pages/Stadiums/Stadiums";
import Stadium from "./pages/BookStadium/Stadium";
import Bookings from "./pages/Bookings/Bookings";
import MyStadiums from "./pages/MyStadiums/MyStadiums";
import StadiumOwnerProtected from "./components/StadiumOwnerProtected/StadiumOwnerProtected";
import { ToastContainer } from "react-toastify";

function App() {
  // use this to navigate to protected routes
  const isAuth = useSelector((state) => state.user.auth);
  const isStadiumOwner = useSelector((state) => state.user.isStadiumOwner);
  return (
    <div className={styles.container}>
      <ToastContainer />

      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div className={styles.main}>
                  <Home />
                </div>
              }
            />
            <Route
              path="stadiums"
              exact
              element={
                <div className={styles.main}>
                  <Stadiums />
                </div>
              }
            />
            <Route
              path="my-stadiums"
              exact
              element={
                <StadiumOwnerProtected isStadiumOwner = {isStadiumOwner}>
                  <div className={styles.main}>
                    <MyStadiums />
                  </div>
                </StadiumOwnerProtected>
              }
            />
            <Route
              path="register-stadium"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <RegisterStadium />
                  </div>
                </Protected>
              }
            />
            <Route
              path="login"
              exact
              element={
                <div className={styles.main}>
                  <Login />
                </div>
              }
            />
            <Route
              path="signup"
              exact
              element={
                <div className={styles.main}>
                  <Signup />
                </div>
              }
            />

            <Route
              path="my-bookings"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <Bookings />
                  </div>
                </Protected>
              }
            />
            <Route
              path="stadium/:id"
              exact
              element={
                <div className={styles.main}>
                  <Stadium />
                </div>
              }
            />

            <Route
              path="*"
              exact
              element={
                <div className={styles.main}>
                  <Error />
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
