import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.css";
import Error from "./pages/Error/Error";

function App() {
  return (
    <div className={styles.container}>
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
              element={<div className={styles.main}>stadiums</div>}
            />
            <Route
              path="login"
              exact
              element={<div className={styles.main}>Login Page</div>}
            />
            <Route
              path="signup"
              exact
              element={<div className={styles.main}>SignUp Page</div>}
            />
            <Route
              path = "*"
              exact
              element = {<div className={styles.main}><Error/></div>}
            />
          </Routes>   
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
