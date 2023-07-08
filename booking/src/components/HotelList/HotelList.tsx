import "./HotelList.css";
import { useEffect, useState } from "react";
import { Hotel } from "../../models/Hotel";
import { getAllHotelsApi } from "../../services/api/hotel-api-services";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getToken, getUserRole } from "../../helpers/tokenHelper";
import { getHotelActionButtons, handleAddNewHotelPressed, handleBookPressed, handleHotelPressed } from "../../helpers/actionButtonsHelper";

function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [search, setSearch] = useState("");

  const role = getUserRole();

  useEffect(() => {
    getAllHotelsApi()
      .then((data) => {
        setHotels(data);
        setFilteredHotels(data);
      })
      .catch((error) => alert(error));
  }, []);

  // search hotels
  useEffect(() => {
    var filtered = hotels.filter((h) => h.name.includes(search) || h.location.includes(search));
    setFilteredHotels(filtered);
  }, [search]);

  const searchHotels = (e: any) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <>
      <Row className="table-toolbar">
        <Form.Group className="search-bar">
          <Form.Control type="text" placeholder="search" value={search} onChange={searchHotels} />
        </Form.Group>
        {role === "Admin" && (
          <Button className="add-new-hotel" onClick={handleAddNewHotelPressed}>
            Add New
          </Button>
        )}
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => {
            return (
              <tr onClick={(id) => handleHotelPressed(hotel.id)} style={{ cursor: "pointer" }}>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td className="action-buttons">{getHotelActionButtons(hotel.id)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default HotelList;
