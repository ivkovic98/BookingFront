import { useState } from "react";
import { CreateHotelModel } from "../../../models/Hotel";
import { addHotelApi } from "../../../services/api/hotel-api-services";
import { Button, Form } from "react-bootstrap";

function AddHotel() {
  const [hotel, setHotel] = useState<CreateHotelModel>({
    name: "",
    location: "",
  });

  const handleNameChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setHotel((prev) => ({
      ...prev,
      name: value,
    }));
  };
  const handleLocationChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setHotel((prev) => ({
      ...prev,
      location: value,
    }));
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addHotelApi(hotel)
      .then((data) => alert(data))
      .catch((error) => alert(error));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control type="text" onChange={handleNameChange} />
          </Form.Group>
        </div>
        <div className="form-control">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" onChange={handleLocationChange} />
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

export default AddHotel;
