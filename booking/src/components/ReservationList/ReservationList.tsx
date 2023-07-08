import React, { useEffect, useState } from "react";
import { Reservation } from "../../models/Reservation";
import { getToken } from "../../helpers/tokenHelper";
import { useParams } from "react-router-dom";
import { Form, Row, Table } from "react-bootstrap";
import moment from "moment";

const ReservationList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");

  const token = getToken();
  const role = token.Role;
  const hotelId = useParams().hotelId || token.HotelId;

  useEffect(() => {}, []);

  // search reservations
  useEffect(() => {
    var filtered = reservations.filter((r) => r.startDate.toString().includes(search) || r.capacity.toString().includes(search));
    setFilteredReservations(filtered);
  }, [search]);

  const searchReservations = (e: any) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <>
      <h2>Reservations</h2>
      <Row className="rooms-toolbar">
        <Form.Group className="search-bar">
          <Form.Control type="text" placeholder="search" value={search} onChange={searchReservations} />
        </Form.Group>
      </Row>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Start</th>
            <th>End </th>
            <th>Capacity</th>
            <th>Hotel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => {
            return (
              <tr>
                <td>{moment(reservation.startDate).format("dd.MM.yyyy")}</td>
                <td>{moment(reservation.endDate).format("dd.MM.yyyy")}</td>
                <td>{reservation.capacity}</td>
                <td className="action-buttons"></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ReservationList;
