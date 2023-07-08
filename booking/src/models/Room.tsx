export type Room = {
  id: string;
  hotelId: string;
  roomNumber: string;
  roomType: string;
  capacity: number;
};

export type CreateRoomModel = {
  roomNumber: string;
  roomType: string;
  hotelId: string;
  capacity: number;
};
