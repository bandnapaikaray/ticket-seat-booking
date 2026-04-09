import { useState, useEffect, useCallback } from "react";
import { fetchSeats, bookSeats, type Seat } from "./api";
import SeatMap from "./components/SeatMap";
import BookingSummary from "./components/BookingSummary";
import { RotateCcw, Theater } from "lucide-react";

function App() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch seats on mount
  const loadSeats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSeats();
      setSeats(data);
    } catch {
      setError("Could not connect to the server. Make sure the backend is running on port 4000.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSeats();
  }, [loadSeats]);

  // Toggle seat selection
  const handleToggleSeat = (seatId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }
      return next;
    });
    // Clear previous feedback
    setBookingMessage(null);
    setBookingSuccess(null);
  };

  // Book selected seats
  const handleBook = async () => {
    if (selectedIds.size === 0 || !name || !email) return;
    setIsBooking(true);
    setBookingMessage(null);
    setBookingSuccess(null);
    try {
      const res = await bookSeats(Array.from(selectedIds), name, email);
      setBookingMessage(res.message);
      setBookingSuccess(res.success);
      if (res.success) {
        // Refresh seat data
        const data = await fetchSeats();
        setSeats(data);
        setSelectedIds(new Set());
        setName("");
        setEmail("");
      }
    } catch {
      setBookingMessage("An unexpected error occurred.");
      setBookingSuccess(false);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-surface-lighter bg-surface-light/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-xl">
              <Theater className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-text-primary to-primary-light bg-clip-text text-transparent">
                SeatPick
              </h1>
              <p className="text-text-muted text-xs -mt-0.5">Premium Ticket Booking</p>
            </div>
          </div>
          <button
            onClick={loadSeats}
            className="flex items-center gap-1.5 text-text-muted hover:text-primary-light text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-10 h-10 border-4 border-surface-lighter border-t-primary rounded-full animate-spin" />
            <p className="text-text-muted text-sm">Loading seats…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-danger text-sm text-center max-w-md">{error}</p>
            <button
              onClick={loadSeats}
              className="text-primary-light hover:text-primary text-sm underline cursor-pointer"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seat Map — takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-surface-light/40 rounded-2xl border border-surface-lighter p-6 sm:p-8">
                <h2 className="text-lg font-bold text-text-primary mb-6">Choose Your Seats</h2>
                <SeatMap
                  seats={seats}
                  selectedIds={selectedIds}
                  onToggleSeat={handleToggleSeat}
                />
              </div>
            </div>

            {/* Booking Summary — 1 column */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <BookingSummary
                  seats={seats}
                  selectedIds={selectedIds}
                  name={name}
                  email={email}
                  onNameChange={setName}
                  onEmailChange={setEmail}
                  onBook={handleBook}
                  isBooking={isBooking}
                  bookingMessage={bookingMessage}
                  bookingSuccess={bookingSuccess}
                />

                {/* Pricing tier hint */}
                <div className="mt-4 bg-surface-light/40 rounded-xl border border-surface-lighter p-4">
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                    Pricing Tiers
                  </h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <PriceTier rows="A – B" price={150} color="text-accent" />
                    <PriceTier rows="C – D" price={120} color="text-primary-light" />
                    <PriceTier rows="E – F" price={80} color="text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-lighter mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-text-muted text-xs">
          &copy; {new Date().getFullYear()} SeatPick — Simple Ticket Seat Booking Demo
        </div>
      </footer>
    </div>
  );
}

function PriceTier({ rows, price, color }: { rows: string; price: number; color: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-text-secondary">Rows {rows}</span>
      <span className={`font-bold ${color}`}>${price}</span>
    </div>
  );
}

export default App;
