import { Button } from "react-bootstrap";
import { getUserRole } from "./tokenHelper";
import { Room } from "../models/Room";

export const handleBookPressed = (hotelId: string) => {
  window.location.href = "book-hotel/" + hotelId;
};

//#region HOTEL ACTION BUTTONS
export const handleAddNewHotelPressed = () => {
  window.location.pathname = "add-hotel";
};

export const handleHotelPressed = (hotelId: string) => {
  window.location.pathname = "hotel-profile/" + hotelId;
};

const handleUpdateHotelPressed = (hotelId: string) => {
  window.location.pathname = "update-hotel/" + hotelId;
};

const handleDeleteHotelPressed = (hotelId: string) => {
  window.location.pathname = "delete-hotel/" + hotelId;
};

const handleAddManagerPressed = (hotelId: string) => {
  window.location.pathname = "register/" + hotelId;
};

export const getHotelActionButtons = (hotelId: string) => {
  var role = getUserRole();
  switch (role) {
    case "Admin":
      return (
        <div className="action-buttons-row">
          <Button variant="danger" onClick={() => handleDeleteHotelPressed(hotelId)}>
            Delete
          </Button>
          <Button variant="warning" onClick={() => handleUpdateHotelPressed(hotelId)}>
            Update
          </Button>
          <Button variant="primary" onClick={() => handleAddManagerPressed(hotelId)}>
            Add Manager
          </Button>
        </div>
      );
    case "Manager":
      return (
        <div className="action-buttons-row">
          <Button variant="warning" onClick={() => handleUpdateHotelPressed(hotelId)}>
            Update
          </Button>
        </div>
      );
    case "Guest":
      return (
        <div className="action-buttons-row">
          <Button variant="success" onClick={() => handleBookPressed(hotelId)}>
            Book
          </Button>
        </div>
      );
    default:
      break;
  }
};
//#endregion

//#region ROOM ACTION BUTTONS
export const handleAddRoomPressed = (hotelId: string) => {
  window.location.pathname = "add-room/" + hotelId;
};

export const handleDeleteRoomPressed = (roomId: string) => {
  window.location.pathname = "delete-room/" + roomId;
};

export const handleUpdateRoomPressed = (roomId: string) => {
  window.location.pathname = "update-room/" + roomId;
};

export const getRoomActionButtons = (room: Room) => {
  var role = getUserRole();
  switch (role) {
    case "Admin":
      return <div className="action-buttons-row"></div>;
    case "Manager":
      return (
        <div className="action-buttons-row">
          <Button variant="warning" onClick={(id) => handleUpdateRoomPressed(room.id)}>
            Update
          </Button>
          <Button variant="danger" onClick={(id) => handleDeleteRoomPressed(room.id)}>
            Delete
          </Button>
          <Button variant="success" onClick={(id) => handleBookPressed(room.id)}>
            Book Room
          </Button>
        </div>
      );
    case "Guest":
      return (
        <div className="action-buttons-row">
          <Button variant="success" onClick={(id) => handleBookPressed(room.id)}>
            Book Room
          </Button>
        </div>
      );
    default:
      break;
  }
};

//#endregion
