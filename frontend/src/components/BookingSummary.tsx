import type { Seat } from "../api";
import { Ticket, CreditCard, User, Mail } from "lucide-react";

interface BookingSummaryProps {
  seats: Seat[];
  selectedIds: Set<string>;
  name: string;
  email: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onBook: () => void;
  isBooking: boolean;
  bookingMessage: string | null;
  bookingSuccess: boolean | null;
}

export default function BookingSummary({
  seats,
  selectedIds,
  name,
  email,
  onNameChange,
  onEmailChange,
  onBook,
  isBooking,
  bookingMessage,
  bookingSuccess,
}: BookingSummaryProps) {
  const selectedSeats = seats.filter((s) => selectedIds.has(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-surface-light rounded-2xl border border-surface-lighter p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Ticket className="w-5 h-5 text-primary-light" />
        </div>
        <h2 className="text-lg font-bold text-text-primary">Booking Summary</h2>
      </div>

      {/* Selected seats list */}
      {selectedSeats.length === 0 ? (
        <p className="text-text-muted text-sm py-4 text-center">
          Select seats from the map to begin
        </p>
      ) : (
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
          {selectedSeats.map((seat) => (
            <div
              key={seat.id}
              className="flex justify-between items-center bg-surface/60 rounded-lg px-3 py-2"
            >
              <span className="text-sm text-text-secondary">
                Row {seat.row} — Seat {seat.number}
              </span>
              <span className="text-sm font-semibold text-primary-light">${seat.price}</span>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center border-t border-surface-lighter pt-4">
        <span className="text-text-secondary font-medium">Total</span>
        <span className="text-2xl font-extrabold text-accent">${totalPrice}</span>
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full bg-surface border border-surface-lighter rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full bg-surface border border-surface-lighter rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
          />
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={onBook}
        disabled={selectedSeats.length === 0 || isBooking || !name || !email}
        className={`
          flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm
          transition-all duration-200 cursor-pointer
          ${selectedSeats.length === 0 || !name || !email
            ? "bg-surface-lighter text-text-muted cursor-not-allowed"
            : "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          }
          disabled:opacity-50
        `}
      >
        <CreditCard className="w-4 h-4" />
        {isBooking ? "Booking…" : `Book ${selectedSeats.length} Seat${selectedSeats.length !== 1 ? "s" : ""}`}
      </button>

      {/* Feedback message */}
      {bookingMessage && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium text-center ${bookingSuccess
              ? "bg-success/10 text-success border border-success/20"
              : "bg-danger/10 text-danger border border-danger/20"
            }`}
        >
          {bookingMessage}
        </div>
      )}
    </div>
  );
}
