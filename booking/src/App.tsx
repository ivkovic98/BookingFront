import { useState } from "react";
import "./App.css";
import AddHotel from "./components/forms/AddHotelForm/AddHotel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import HotelProfile from "./components/HotelProfile/HotelProfile";
import AddRoom from "./components/forms/AddRoomForm/AddRoom";
import LogInForm from "./components/forms/LogIn/LogInForm";
import { Navbar, Container } from "react-bootstrap";
import ProtectedRoute, { ProtectedRouteProps } from "./guard/ProtectedRoute";
import HomePage from "./components/HomePage/HomePage";
import RegisterForm from "./components/forms/RegisterForm";
import BookHotel from "./components/BookHotel/BookHotel";

function App() {
  //login and authorization
  // depending on the role show different components
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  console.log(token);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    authenticationPath: "/",
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home-page">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text style={{ cursor: "pointer" }} onClick={logOut}>
              Log out
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ padding: "2% 10%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Routes>
          <Route path={"/"} element={<LogInForm />} />
          <Route path={"/register/:hotelId"} element={<RegisterForm />} />

          <Route path="/home-page" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage />} />} />

          <Route path="/add-hotel" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<AddHotel />} />} />
          <Route path="/hotel-profile/:hotelId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HotelProfile />} />} />
          <Route path="/delete-hotel/:hotelId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HotelProfile />} />} />
          <Route path="/update-hotel/:hotelId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HotelProfile />} />} />

          <Route path="/add-room/:hotelId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<AddRoom />} />} />
          <Route path="/delete-room/:hotelId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<AddRoom />} />} />
          <Route path="/update-room/:hotelId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<AddRoom />} />} />

          <Route path="/book-hotel/:hotelId" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<BookHotel />} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
