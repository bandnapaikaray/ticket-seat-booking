export interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: "available" | "booked";
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookedSeats?: Seat[];
  totalPrice?: number;
}

const API_BASE = (import.meta as any).env.VITE_API_BASE || "/api";

export async function fetchSeats(): Promise<Seat[]> {
  const res = await fetch(`${API_BASE}/seats`);
  if (!res.ok) throw new Error("Failed to fetch seats");
  return res.json();
}

export async function bookSeats(
  seatIds: string[],
  name: string,
  email: string
): Promise<BookingResponse> {
  const res = await fetch(`${API_BASE}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seatIds, name, email }),
  });
  return res.json();
}
