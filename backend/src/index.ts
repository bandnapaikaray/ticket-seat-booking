import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { seats } from "./data";
import { BookingRequest, BookingResponse } from "./types";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// ─── Root Route ───────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.send("Ticket Booking API is running! Use /api/seats to see data.");
});

// ─── GET /api/seats ────────────────────────────────────────────
// Returns the full list of seats with their current status
app.get("/api/seats", (_req, res) => {
  res.json(seats);
});

// ─── POST /api/book ────────────────────────────────────────────
// Books the requested seats if they are all available
app.post("/api/book", (req, res) => {
  const { seatIds, name, email } = req.body as BookingRequest;

  // Validation
  if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
    const response: BookingResponse = {
      success: false,
      message: "Please select at least one seat.",
    };
    res.status(400).json(response);
    return;
  }

  if (!name || !email) {
    const response: BookingResponse = {
      success: false,
      message: "Name and email are required.",
    };
    res.status(400).json(response);
    return;
  }

  // Check all requested seats exist and are available
  const targetSeats = seats.filter((s) => seatIds.includes(s.id));

  if (targetSeats.length !== seatIds.length) {
    const response: BookingResponse = {
      success: false,
      message: "One or more selected seats do not exist.",
    };
    res.status(400).json(response);
    return;
  }

  const alreadyBooked = targetSeats.filter((s) => s.status === "booked");
  if (alreadyBooked.length > 0) {
    const ids = alreadyBooked.map((s) => s.id).join(", ");
    const response: BookingResponse = {
      success: false,
      message: `Seats ${ids} are already booked.`,
    };
    res.status(409).json(response);
    return;
  }

  // Book the seats
  let totalPrice = 0;
  for (const seat of targetSeats) {
    seat.status = "booked";
    totalPrice += seat.price;
  }

  console.log(`✅ Booked seats [${seatIds.join(", ")}] for ${name} (${email}) — $${totalPrice}`);

  const response: BookingResponse = {
    success: true,
    message: `Successfully booked ${targetSeats.length} seat(s)!`,
    bookedSeats: targetSeats,
    totalPrice,
  };
  res.json(response);
});

// ─── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
