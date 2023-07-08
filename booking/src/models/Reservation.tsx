import { Hotel } from "./Hotel";
import { Room } from "./Room";

export type CreateReservationModel = {
  startDate: Date;
  endDate: Date;
  price?: number;
  capacity: number;
  paid: boolean;
  guestId: string;
  roomsIds: string[];
  hotelId: string;
};

export type Reservation = {
  id: string;
  startDate: Date;
  endDate: Date;
  price?: number;
  capacity: number;
  paid: boolean;
  guestId: string;
  rooms: Room[];
  hotel: Hotel;
};
