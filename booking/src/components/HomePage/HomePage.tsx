import "./HomePage.css";
import jwtDecode from "jwt-decode";

import HotelList from "../HotelList/HotelList";
import HotelProfile from "../HotelProfile/HotelProfile";
import { getToken, getUserRole } from "../../helpers/tokenHelper";
import ReservationList from "../ReservationList/ReservationList";

function HomePage() {
  var role = getUserRole();

  var token = getToken();

  if (role === "Manager") {
    window.location.href = "hotel-profile/" + token.HotelId;
  }

  return (
    <div className="home-page">
      {role === "Admin" && <HotelList />}
      {role === "Guest" && (
        <>
          <ReservationList />
          <HotelList />
        </>
      )}
    </div>
  );
}

export default HomePage;
