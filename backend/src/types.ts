export interface Seat {
  id: string;        // e.g. "A1", "B5"
  row: string;       // e.g. "A", "B"
  number: number;    // e.g. 1, 2, 3
  price: number;     // price in dollars
  status: "available" | "booked";
}

export interface BookingRequest {
  seatIds: string[];
  name: string;
  email: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookedSeats?: Seat[];
  totalPrice?: number;
}
