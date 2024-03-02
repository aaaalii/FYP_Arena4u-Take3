import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes> 
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
