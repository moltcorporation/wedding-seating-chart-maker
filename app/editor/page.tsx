"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Guest {
  id: string;
  eventId: string;
  name: string;
}

interface EventData {
  id: string;
  name: string;
}

type TableType = "round" | "rectangular" | "head" | "sweetheart" | "kids";

interface WeddingTable {
  id: string;
  type: TableType;
  name: string;
  seats: number;
  x: number;
  y: number;
}

// assignments: { [tableId]: string[] } — array of guestIds per table
type Assignments = Record<string, string[]>;

// ─── Constants ───────────────────────────────────────────────────────────────

const TABLE_PRESETS: Record<TableType, { label: string; defaultSeats: number; description: string }> = {
  round: { label: "Round Table", defaultSeats: 8, description: "6-12 seats" },
  rectangular: { label: "Banquet Table", defaultSeats: 8, description: "6-12 seats" },
  head: { label: "Head Table", defaultSeats: 10, description: "Wedding party, single-sided" },
  sweetheart: { label: "Sweetheart Table", defaultSeats: 2, description: "Couple only" },
  kids: { label: "Kids' Table", defaultSeats: 6, description: "Smaller round" },
};

const CANVAS_W = 900;
const CANVAS_H = 600;
const FREE_TABLE_LIMIT = 3;

// ─── Helpers ────────────────────────────────────────────────────────────────

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function getTableDimensions(table: WeddingTable): { w: number; h: number } {
  switch (table.type) {
    case "round":
      return { w: 100, h: 100 };
    case "rectangular":
      return { w: 160, h: 70 };
    case "head":
      return { w: 220, h: 60 };
    case "sweetheart":
      return { w: 80, h: 80 };
    case "kids":
      return { w: 80, h: 80 };
  }
}

// ─── Editor Page ─────────────────────────────────────────────────────────────

export default function EditorPage() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [tables, setTables] = useState<WeddingTable[]>([]);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newGuestName, setNewGuestName] = useState("");
  const [eventName, setEventName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [dragGuestId, setDragGuestId] = useState<string | null>(null);
  const [dragTableId, setDragTableId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [proEmail, setProEmail] = useState("");
  const [showProModal, setShowProModal] = useState(false);
  const [proCheckStatus, setProCheckStatus] = useState<"idle" | "checking" | "error">("idle");
  const canvasRef = useRef<HTMLDivElement>(null);

  // ─── Load event on mount ──────────────────────────────────────────────────

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/events");
        const eventList: EventData[] = await res.json();
        if (eventList.length > 0) {
          setEvent(eventList[0]);
          const [guestRes, fpRes] = await Promise.all([
            fetch(`/api/guests?eventId=${eventList[0].id}`),
            fetch(`/api/floor-plans?eventId=${eventList[0].id}`),
          ]);
          const guestList: Guest[] = await guestRes.json();
          setGuests(guestList);
          const fpData = await fpRes.json();
          if (fpData) {
            setTables((fpData.tables as WeddingTable[]) || []);
            setAssignments((fpData.assignments as Assignments) || {});
          }
        }
      } catch {
        setError("Failed to load event data");
      }
      setLoading(false);
    }
    load();
  }, []);

  // ─── Check Pro status on mount ─────────────────────────────────────────────

  useEffect(() => {
    const savedEmail = localStorage.getItem("pro_email");
    if (savedEmail) {
      fetch(`/api/pro/check?email=${encodeURIComponent(savedEmail)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.pro) setIsPro(true);
          else localStorage.removeItem("pro_email");
        })
        .catch(() => {});
    }
  }, []);

  async function activatePro() {
    const trimmed = proEmail.trim().toLowerCase();
    if (!trimmed) return;
    setProCheckStatus("checking");
    try {
      const res = await fetch(`/api/pro/check?email=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (data.pro) {
        localStorage.setItem("pro_email", trimmed);
        localStorage.setItem("pro_plan", data.plan);
        setIsPro(true);
        setShowProModal(false);
        setProCheckStatus("idle");
      } else {
        setProCheckStatus("error");
      }
    } catch {
      setProCheckStatus("error");
    }
  }

  // ─── Event CRUD ───────────────────────────────────────────────────────────

  async function createEvent() {
    if (!eventName.trim()) return;
    const savedEmail = localStorage.getItem("pro_email");
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: eventName.trim(), proEmail: savedEmail || undefined }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }
    const created: EventData = await res.json();
    setEvent(created);
    setEventName("");
    setTables([]);
    setGuests([]);
    setAssignments({});
  }

  // ─── Guest CRUD ───────────────────────────────────────────────────────────

  async function addGuest() {
    if (!event || !newGuestName.trim()) return;
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: event.id, name: newGuestName.trim() }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }
    const created: Guest = await res.json();
    setGuests((prev) => [...prev, created]);
    setNewGuestName("");
  }

  async function updateGuest(id: string, name: string) {
    const res = await fetch("/api/guests", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });
    if (res.ok) {
      setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, name } : g)));
    }
    setEditingId(null);
  }

  async function deleteGuest(id: string) {
    if (!event) return;
    await fetch(`/api/guests?id=${id}&eventId=${event.id}`, { method: "DELETE" });
    setGuests((prev) => prev.filter((g) => g.id !== id));
    // Remove from assignments
    setAssignments((prev) => {
      const next = { ...prev };
      for (const tableId of Object.keys(next)) {
        next[tableId] = next[tableId].filter((gid) => gid !== id);
      }
      return next;
    });
  }

  async function importCSV() {
    if (!event) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.txt";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const names = text
        .split(/[\n,]/)
        .map((n) => n.trim())
        .filter((n) => n.length > 0);
      if (names.length === 0) return;
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, names }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return;
      }
      const created: Guest[] = await res.json();
      setGuests((prev) => [...prev, ...created]);
    };
    input.click();
  }

  // ─── Table Management ─────────────────────────────────────────────────────

  function addTable(type: TableType) {
    if (!isPro && tables.length >= FREE_TABLE_LIMIT) {
      setError("Free tier: max 3 tables. Upgrade to Pro for unlimited.");
      return;
    }
    const preset = TABLE_PRESETS[type];
    // Spread tables across canvas based on count
    const count = tables.length;
    const col = count % 3;
    const row = Math.floor(count / 3);
    const newTable: WeddingTable = {
      id: makeId(),
      type,
      name: `${preset.label} ${tables.filter((t) => t.type === type).length + 1}`,
      seats: preset.defaultSeats,
      x: 120 + col * 250,
      y: 120 + row * 200,
    };
    setTables((prev) => [...prev, newTable]);
    setAssignments((prev) => ({ ...prev, [newTable.id]: [] }));
  }

  function removeTable(tableId: string) {
    setTables((prev) => prev.filter((t) => t.id !== tableId));
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[tableId];
      return next;
    });
    if (selectedTable === tableId) setSelectedTable(null);
  }

  function updateTableSeats(tableId: string, seats: number) {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, seats: Math.max(2, Math.min(12, seats)) } : t))
    );
    // Trim assignments if seats reduced
    setAssignments((prev) => {
      const arr = prev[tableId] || [];
      if (arr.length > seats) {
        return { ...prev, [tableId]: arr.slice(0, seats) };
      }
      return prev;
    });
  }

  function renameTable(tableId: string, name: string) {
    setTables((prev) => prev.map((t) => (t.id === tableId ? { ...t, name } : t)));
  }

  // ─── Drag guest to table ──────────────────────────────────────────────────

  function handleGuestDragStart(guestId: string) {
    setDragGuestId(guestId);
  }

  function handleTableDrop(tableId: string) {
    if (!dragGuestId) return;
    const table = tables.find((t) => t.id === tableId);
    if (!table) return;
    const current = assignments[tableId] || [];
    if (current.length >= table.seats) return; // Table full
    if (current.includes(dragGuestId)) return; // Already seated here

    // Remove from any other table first
    const newAssignments = { ...assignments };
    for (const tid of Object.keys(newAssignments)) {
      newAssignments[tid] = newAssignments[tid].filter((gid) => gid !== dragGuestId);
    }
    newAssignments[tableId] = [...(newAssignments[tableId] || []), dragGuestId];
    setAssignments(newAssignments);
    setDragGuestId(null);
  }

  function unseatGuest(guestId: string) {
    setAssignments((prev) => {
      const next = { ...prev };
      for (const tableId of Object.keys(next)) {
        next[tableId] = next[tableId].filter((gid) => gid !== guestId);
      }
      return next;
    });
  }

  // ─── Drag table on canvas ────────────────────────────────────────────────

  function handleTableMouseDown(e: React.MouseEvent, tableId: string) {
    if (dragGuestId) return; // Don't move table while placing guest
    e.preventDefault();
    const table = tables.find((t) => t.id === tableId);
    if (!table) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDragTableId(tableId);
    setDragOffset({
      x: e.clientX - rect.left - table.x,
      y: e.clientY - rect.top - table.y,
    });
    setSelectedTable(tableId);
  }

  function handleCanvasMouseMove(e: React.MouseEvent) {
    if (!dragTableId) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(CANVAS_W - 50, e.clientX - rect.left - dragOffset.x));
    const y = Math.max(0, Math.min(CANVAS_H - 50, e.clientY - rect.top - dragOffset.y));
    setTables((prev) => prev.map((t) => (t.id === dragTableId ? { ...t, x, y } : t)));
  }

  function handleCanvasMouseUp() {
    setDragTableId(null);
  }

  // ─── Save ─────────────────────────────────────────────────────────────────

  const saveFloorPlan = useCallback(async () => {
    if (!event) return;
    setSaving(true);
    await fetch("/api/floor-plans", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: event.id, tables, assignments }),
    });
    setSaving(false);
  }, [event, tables, assignments]);

  // ─── PDF Export ───────────────────────────────────────────────────────────

  function exportPDF() {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "letter" });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();

    // Header
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(event?.name || "Wedding Seating Chart", pw / 2, 40, { align: "center" });

    // Scale canvas to fit page
    const scale = Math.min((pw - 80) / CANVAS_W, (ph - 120) / CANVAS_H);
    const offsetX = (pw - CANVAS_W * scale) / 2;
    const offsetY = 70;

    // Draw each table
    const guestMap = Object.fromEntries(guests.map((g) => [g.id, g]));

    tables.forEach((table) => {
      const dim = getTableDimensions(table);
      const tx = offsetX + table.x * scale;
      const ty = offsetY + table.y * scale;
      const tw = dim.w * scale;
      const th = dim.h * scale;

      // Table shape
      doc.setDrawColor(180, 160, 140);
      doc.setFillColor(252, 250, 247);
      doc.setLineWidth(1);

      if (table.type === "round" || table.type === "kids" || table.type === "sweetheart") {
        doc.ellipse(tx + tw / 2, ty + th / 2, tw / 2, th / 2, "FD");
      } else {
        doc.roundedRect(tx, ty, tw, th, 4, 4, "FD");
      }

      // Table name
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 80, 60);
      doc.text(table.name, tx + tw / 2, ty + th / 2 - 4, { align: "center" });

      // Seated guests around table
      const seated = assignments[table.id] || [];
      doc.setFontSize(6);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 70, 60);
      seated.forEach((gid, i) => {
        const guest = guestMap[gid];
        if (!guest) return;
        const angle = (2 * Math.PI * i) / Math.max(seated.length, 1);
        const rx = tw / 2 + 14;
        const ry = th / 2 + 14;
        const gx = tx + tw / 2 + rx * Math.cos(angle);
        const gy = ty + th / 2 + ry * Math.sin(angle);
        doc.text(guest.name, gx, gy, { align: "center" });
      });
    });

    // Watermark for free tier only
    if (!isPro) {
      doc.setFontSize(8);
      doc.setTextColor(200, 200, 200);
      doc.text("Made with Wedding Seating Chart Maker (Free)", pw / 2, ph - 15, {
        align: "center",
      });
    }

    doc.save(`${event?.name || "seating-chart"}.pdf`);
  }

  // ─── Derived ──────────────────────────────────────────────────────────────

  const allSeatedIds = new Set(Object.values(assignments).flat());
  const unseatedGuests = guests.filter((g) => !allSeatedIds.has(g.id));
  const guestMap = Object.fromEntries(guests.map((g) => [g.id, g]));
  const totalSeated = allSeatedIds.size;

  // ─── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-400 font-serif italic">Loading your event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-serif font-bold text-stone-800">
            Create Your Wedding
          </h1>
          <p className="mt-2 text-sm text-stone-500 font-serif italic">
            Start planning your perfect seating arrangement
          </p>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <div className="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="e.g. Sarah & James — June 2026"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createEvent()}
              className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm font-serif"
            />
            <button
              onClick={createEvent}
              className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-stone-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
        <div>
          <h1 className="text-lg font-serif font-bold text-stone-800">
            {event.name}
            {isPro && (
              <span className="ml-2 inline-block rounded-full bg-stone-800 px-2 py-0.5 text-[10px] font-medium text-white align-middle">
                PRO
              </span>
            )}
          </h1>
          <p className="text-xs text-stone-500">
            {guests.length} guests &middot; {totalSeated} seated &middot; {tables.length} table{tables.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isPro && (
            <>
              <button
                onClick={() => setShowProModal(true)}
                className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                Activate Pro
              </button>
              <Link
                href="/pricing"
                className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                Upgrade
              </Link>
            </>
          )}
          <button
            onClick={saveFloorPlan}
            disabled={saving}
            className="rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={exportPDF}
            className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Export PDF
          </button>
        </div>
      </header>

      {/* Pro Activation Modal */}
      {showProModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-serif font-bold text-stone-800">Activate Pro</h2>
            <p className="mt-2 text-sm text-stone-500">
              Enter the email you used at checkout.
            </p>
            {proCheckStatus === "error" && (
              <p className="mt-2 text-sm text-red-500">
                No Pro purchase found. It may take a few minutes to process.
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={proEmail}
                onChange={(e) => setProEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && activatePro()}
                className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm"
              />
              <button
                onClick={activatePro}
                disabled={proCheckStatus === "checking"}
                className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
              >
                {proCheckStatus === "checking" ? "..." : "Activate"}
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Link href="/pricing" className="text-xs text-stone-500 underline hover:text-stone-700">
                View pricing
              </Link>
              <button
                onClick={() => { setShowProModal(false); setProCheckStatus("idle"); }}
                className="text-xs text-stone-400 hover:text-stone-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-4 py-2">
          <p className="text-sm text-red-600">{error}</p>
          <button onClick={() => setError(null)} className="text-xs text-red-400 underline">
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — Guest List & Tables */}
        <aside className="flex w-72 flex-col border-r border-stone-200 bg-white">
          {/* Add Table Section */}
          <div className="border-b border-stone-200 p-3">
            <h2 className="text-sm font-semibold text-stone-700">Add Table</h2>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {(Object.entries(TABLE_PRESETS) as [TableType, typeof TABLE_PRESETS[TableType]][]).map(
                ([type, preset]) => (
                  <button
                    key={type}
                    onClick={() => addTable(type)}
                    className="rounded border border-stone-200 px-2 py-1.5 text-left text-xs hover:bg-stone-50"
                  >
                    <div className="font-medium text-stone-700">{preset.label}</div>
                    <div className="text-stone-400">{preset.description}</div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Selected Table Config */}
          {selectedTable && (() => {
            const table = tables.find((t) => t.id === selectedTable);
            if (!table) return null;
            const seated = assignments[table.id] || [];
            return (
              <div className="border-b border-stone-200 p-3 bg-stone-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-stone-700">Table Settings</h3>
                  <button
                    onClick={() => removeTable(table.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    value={table.name}
                    onChange={(e) => renameTable(table.id, e.target.value)}
                    className="w-full rounded border border-stone-300 px-2 py-1 text-sm"
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-stone-500">Seats:</label>
                    <input
                      type="number"
                      min={2}
                      max={12}
                      value={table.seats}
                      onChange={(e) => updateTableSeats(table.id, Number(e.target.value))}
                      className="w-16 rounded border border-stone-300 px-2 py-1 text-sm"
                    />
                  </div>
                  {seated.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs text-stone-500">{seated.length}/{table.seats} seated:</p>
                      {seated.map((gid) => {
                        const g = guestMap[gid];
                        return g ? (
                          <div key={gid} className="flex items-center justify-between text-xs mt-0.5">
                            <span className="text-stone-600 truncate">{g.name}</span>
                            <button
                              onClick={() => unseatGuest(gid)}
                              className="text-stone-400 hover:text-red-500 ml-1"
                            >
                              &times;
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Guest Roster */}
          <div className="border-b border-stone-200 p-3">
            <h2 className="text-sm font-semibold text-stone-700">Guest List</h2>
            <div className="mt-2 flex gap-1">
              <input
                type="text"
                placeholder="Add guest..."
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGuest()}
                className="flex-1 rounded border border-stone-300 px-2 py-1 text-sm"
              />
              <button
                onClick={addGuest}
                className="rounded bg-stone-800 px-2 py-1 text-sm text-white hover:bg-stone-700"
              >
                +
              </button>
            </div>
            <button
              onClick={importCSV}
              className="mt-2 w-full rounded border border-dashed border-stone-300 py-1 text-xs text-stone-500 hover:border-stone-400"
            >
              Import CSV
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {guests.length === 0 && (
              <p className="mt-4 text-center text-xs text-stone-400 italic">
                No guests yet. Add guests above or import a CSV.
              </p>
            )}
            {guests.map((guest) => (
              <div
                key={guest.id}
                draggable
                onDragStart={() => handleGuestDragStart(guest.id)}
                className={`mb-1 flex items-center justify-between rounded px-2 py-1.5 text-sm cursor-grab active:cursor-grabbing ${
                  allSeatedIds.has(guest.id)
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-stone-50 text-stone-700"
                }`}
              >
                {editingId === guest.id ? (
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={() => updateGuest(guest.id, editName)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") updateGuest(guest.id, editName);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="flex-1 rounded border px-1 py-0.5 text-xs"
                  />
                ) : (
                  <span
                    onDoubleClick={() => {
                      setEditingId(guest.id);
                      setEditName(guest.name);
                    }}
                    className="flex-1 truncate"
                    title="Double-click to edit"
                  >
                    {guest.name}
                  </span>
                )}
                <div className="ml-1 flex items-center gap-1">
                  {allSeatedIds.has(guest.id) && (
                    <button
                      onClick={() => unseatGuest(guest.id)}
                      className="text-xs text-stone-400 hover:text-orange-500"
                      title="Unseat"
                    >
                      &times;
                    </button>
                  )}
                  <button
                    onClick={() => deleteGuest(guest.id)}
                    className="text-xs text-stone-400 hover:text-red-500"
                    title="Delete"
                  >
                    &minus;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 overflow-auto relative">
          <div
            ref={canvasRef}
            className="relative bg-white rounded-xl border border-stone-200 shadow-sm m-6"
            style={{ width: CANVAS_W, height: CANVAS_H, minWidth: CANVAS_W }}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          >
            {tables.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-stone-300 font-serif italic text-lg">
                  Add tables from the sidebar to begin
                </p>
              </div>
            )}

            {tables.map((table) => {
              const dim = getTableDimensions(table);
              const seated = assignments[table.id] || [];
              const isSelected = selectedTable === table.id;

              return (
                <div
                  key={table.id}
                  className={`absolute cursor-move select-none ${isSelected ? "z-20" : "z-10"}`}
                  style={{ left: table.x, top: table.y }}
                  onMouseDown={(e) => handleTableMouseDown(e, table.id)}
                  onClick={() => setSelectedTable(table.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleTableDrop(table.id)}
                >
                  {/* Table shape */}
                  <div
                    className={`flex flex-col items-center justify-center border-2 ${
                      isSelected ? "border-stone-600 shadow-lg" : "border-stone-300"
                    } bg-stone-50 transition-shadow ${
                      table.type === "round" || table.type === "kids" || table.type === "sweetheart"
                        ? "rounded-full"
                        : "rounded-lg"
                    }`}
                    style={{ width: dim.w, height: dim.h }}
                  >
                    <span className="text-xs font-semibold text-stone-600 truncate px-2">
                      {table.name}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {seated.length}/{table.seats}
                    </span>
                  </div>

                  {/* Seated guest names around table */}
                  {seated.map((gid, i) => {
                    const guest = guestMap[gid];
                    if (!guest) return null;
                    const angle = (2 * Math.PI * i) / Math.max(seated.length, 1) - Math.PI / 2;
                    const rx = dim.w / 2 + 24;
                    const ry = dim.h / 2 + 18;
                    const gx = dim.w / 2 + rx * Math.cos(angle) - 20;
                    const gy = dim.h / 2 + ry * Math.sin(angle) - 6;
                    return (
                      <div
                        key={gid}
                        className="absolute text-[10px] text-stone-500 w-10 text-center truncate pointer-events-none"
                        style={{ left: gx, top: gy }}
                      >
                        {guest.name.split(" ")[0]}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Unseated indicator */}
          {unseatedGuests.length > 0 && (
            <div className="absolute bottom-3 left-9 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
              {unseatedGuests.length} guest{unseatedGuests.length !== 1 ? "s" : ""} not seated.
              Drag them onto a table.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
