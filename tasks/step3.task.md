# Step 3 – Dashboard Data, Active Vehicles Model & API Integration

## 📦 Backend – FastAPI Models & Endpoints
- [ ] Create a `Vehicle` Pydantic model with:
  - id (UUID or int)
  - year (int)
  - make (str)
  - model (str)
  - lot_location (str)
  - check_in_time (datetime)
  - checked_out (bool)
  - fee_paid (float)
- [ ] Use an in-memory list to simulate a data store (no database yet)
- [ ] Implement the following FastAPI endpoints under `/vehicles`:
  - `GET /vehicles/` → return all active vehicles (`checked_out == False`)
  - `GET /vehicles/{id}` → return a single vehicle by ID
  - `POST /vehicles/` → add a new vehicle
  - `PATCH /vehicles/{id}/checkout` → mark vehicle as checked out and set fee_paid

## 💻 Frontend – Dashboard + Vehicles Integration
- [ ] Fetch live vehicle data for dashboard stats:
  - Total active vehicles
  - Total valeted today
  - Total revenue earned today
- [ ] Use `fetch`/`axios` from Next.js to call the backend
- [ ] Update Dashboard page (`/dashboard`) to show:
  - Stat cards populated with live data
- [ ] Update Vehicles page (`/vehicles`) to:
  - Render a scrollable list of active vehicles (make/model + lot location)
  - Link each vehicle to a detail view (`/vehicles/[id]`)
- [ ] Create detail view page (`/vehicles/[id]/page.tsx`) to:
  - Show full vehicle info
  - Include a "Checkout" button (triggers `PATCH /checkout`)

## 🧪 Testing
- [ ] Test full data flow:
  - POST new vehicles via frontend or REST client
  - View updated stats in dashboard
  - View and checkout vehicles via UI
