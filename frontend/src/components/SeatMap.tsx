import type { Seat } from "../api";

interface SeatMapProps {
  seats: Seat[];
  selectedIds: Set<string>;
  onToggleSeat: (seatId: string) => void;
}

export default function SeatMap({ seats, selectedIds, onToggleSeat }: SeatMapProps) {
  // Group seats by row
  const rows = seats.reduce<Record<string, Seat[]>>((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const sortedRowKeys = Object.keys(rows).sort();

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Screen indicator */}
      <div className="relative w-full max-w-lg mb-4">
        <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-80" />
        <p className="text-center text-text-muted text-xs mt-2 uppercase tracking-[0.25em] font-medium">
          Stage / Screen
        </p>
      </div>

      {/* Seat grid */}
      <div className="flex flex-col gap-3 w-full max-w-lg">
        {sortedRowKeys.map((rowKey) => {
          const rowSeats = rows[rowKey].sort((a, b) => a.number - b.number);
          return (
            <div key={rowKey} className="flex items-center gap-2">
              {/* Row label */}
              <span className="w-6 text-center text-text-muted text-sm font-semibold shrink-0">
                {rowKey}
              </span>

              {/* Seats */}
              <div className="flex gap-1.5 flex-1 justify-center">
                {rowSeats.map((seat, idx) => {
                  const isBooked = seat.status === "booked";
                  const isSelected = selectedIds.has(seat.id);

                  // Add aisle gap in the middle
                  const hasAisle = idx === Math.floor(rowSeats.length / 2);

                  return (
                    <div key={seat.id} className={`flex ${hasAisle ? "ml-4" : ""}`}>
                      <button
                        disabled={isBooked}
                        onClick={() => onToggleSeat(seat.id)}
                        title={
                          isBooked
                            ? `Seat ${seat.id} — Booked`
                            : `Seat ${seat.id} — $${seat.price}`
                        }
                        className={`
                          w-9 h-9 rounded-lg text-xs font-bold
                          transition-all duration-200 ease-out
                          border-2 cursor-pointer
                          ${isBooked
                            ? "bg-surface-lighter/60 border-surface-lighter text-text-muted cursor-not-allowed opacity-50"
                            : isSelected
                              ? "bg-primary border-primary-light text-white shadow-[0_0_12px_rgba(99,102,241,0.5)] scale-110"
                              : "bg-surface-light border-surface-lighter text-text-secondary hover:border-primary hover:text-primary-light hover:scale-105"
                          }
                        `}
                      >
                        {seat.number}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Row label (right) */}
              <span className="w-6 text-center text-text-muted text-sm font-semibold shrink-0">
                {rowKey}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <LegendItem color="bg-surface-light border-surface-lighter" label="Available" />
        <LegendItem color="bg-primary border-primary-light" label="Selected" />
        <LegendItem color="bg-surface-lighter/60 border-surface-lighter opacity-50" label="Booked" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded border-2 ${color}`} />
      <span className="text-text-muted text-xs">{label}</span>
    </div>
  );
}
