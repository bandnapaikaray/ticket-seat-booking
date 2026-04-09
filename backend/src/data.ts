import { Seat } from "./types";

const ROWS = ["A", "B", "C", "D", "E", "F"];
const SEATS_PER_ROW = 10;

// Pricing tiers: front rows are premium
const ROW_PRICES: Record<string, number> = {
  A: 150,
  B: 150,
  C: 120,
  D: 120,
  E: 80,
  F: 80,
};

function generateSeats(): Seat[] {
  const seats: Seat[] = [];

  for (const row of ROWS) {
    for (let num = 1; num <= SEATS_PER_ROW; num++) {
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        price: ROW_PRICES[row],
        status: "available",
      });
    }
  }

  // Pre-book a handful of seats to make it look realistic
  const preBooked = ["A3", "A4", "B7", "C2", "C5", "C6", "D9", "E1", "F4", "F5"];
  for (const seat of seats) {
    if (preBooked.includes(seat.id)) {
      seat.status = "booked";
    }
  }

  return seats;
}

// In-memory store
export const seats: Seat[] = generateSeats();
