import "../HotelList/HotelList.css";
import "./RoomList.css";
import React, { useEffect, useState } from "react";
import { Room } from "../../models/Room";
import { useParams } from "react-router-dom";
import { getToken, getUserRole } from "../../helpers/tokenHelper";
import { getHotelRoomsApi } from "../../services/api/room-api-services";
import { Button, Form, Row, Table } from "react-bootstrap";
import { getRoomActionButtons, handleAddRoomPressed } from "../../helpers/actionButtonsHelper";

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");

  const token = getToken();
  const role = token.Role;
  const hotelId = useParams().hotelId || token.HotelId;

  useEffect(() => {
    getHotelRoomsApi(hotelId)
      .then((data) => {
        setRooms(data);
        setFilteredRooms(data);
      })
      .catch((error) => alert(error));
  }, []);

  // search rooms
  useEffect(() => {
    var filtered = rooms.filter((r) => r.roomNumber.includes(search) || r.capacity.toString().includes(search) || r.roomType.includes(search));
    setFilteredRooms(filtered);
  }, [search]);

  const searchRooms = (e: any) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <>
      <h2>Rooms</h2>
      <Row className="rooms-toolbar">
        <Form.Group className="search-bar">
          <Form.Control type="text" placeholder="search" value={search} onChange={searchRooms} />
        </Form.Group>
        {role === "Manager" && (
          <Button className="add-new-hotel" onClick={() => handleAddRoomPressed(hotelId)}>
            Add New
          </Button>
        )}
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Number</th>
            <th>Type </th>
            <th>Capacity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => {
            return (
              <tr>
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
                <td>{room.capacity}</td>
                <td className="action-buttons">{getRoomActionButtons(room)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default RoomList;
