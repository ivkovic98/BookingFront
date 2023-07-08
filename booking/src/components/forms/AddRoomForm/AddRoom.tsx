import { useEffect, useState } from "react";
import { CreateRoomModel } from "../../../models/Room";
import { Form, Button } from "react-bootstrap";
import { addRoomApi } from "../../../services/api/room-api-services";
import { useNavigation, useParams } from "react-router-dom";
import { getToken } from "../../../helpers/tokenHelper";

function AddRoom() {
  const token = getToken();
  const hotelId = useParams().hotelId || token.HotelId;
  console.log("hotelid: ", hotelId);

  const [room, setRoom] = useState<CreateRoomModel>({
    roomNumber: "",
    roomType: "",
    hotelId: hotelId,
    capacity: 0,
  });

  useEffect(() => {
    setRoom((prev) => ({
      ...prev,
      hotelId: hotelId,
    }));
  }, []);

  const handleRoomNumberChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setRoom((prev) => ({
      ...prev,
      roomNumber: value,
    }));
  };
  const handleRoomTypeChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setRoom((prev) => ({
      ...prev,
      roomType: value,
    }));
  };

  const handleCapacityChanged = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setRoom((prev) => ({
      ...prev,
      capacity: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addRoomApi(room)
      .then((data) => (window.location.pathname = "hotel-profile/" + hotelId))
      .catch((error) => alert(error));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Room Number</Form.Label>
            <Form.Control type="text" onChange={handleRoomNumberChange} />
            <Form.Label>Room Type</Form.Label>
            <Form.Control type="text" onChange={handleRoomTypeChange} />
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="text" onChange={handleCapacityChanged} />
          </Form.Group>
        </div>
        <div className="form-control">
          <label></label>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}
export default AddRoom;
