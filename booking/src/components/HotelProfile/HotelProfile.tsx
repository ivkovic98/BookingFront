import "./HotelProfile.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHotelByIdApi } from "../../services/api/hotel-api-services";
import { Hotel } from "../../models/Hotel";
import { Button } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { getToken, getUserRole } from "../../helpers/tokenHelper";
import { getHotelActionButtons } from "../../helpers/actionButtonsHelper";
import RoomList from "../RoomList/RoomList";

function HotelProfile() {
  const [hotel, setHotel] = useState<Hotel>({ name: "", location: "", id: "0" });

  const token = getToken();
  const role = getUserRole();

  const hotelId = useParams().hotelId || token.HotelId;

  useEffect(() => {
    getHotelByIdApi(hotelId).then((data) => {
      setHotel(data);
    });
  }, []);

  //TODO: Create room list as hotel list, create Add Room button
  // Create reservation List

  return (
    <>
      <div className="hotel-profile">
        <h1>{hotel.name}</h1>
        <h3>{hotel.location}</h3>
        <div>{getHotelActionButtons(hotelId)}</div>
      </div>
      <RoomList />
    </>
  );
}
export default HotelProfile;
