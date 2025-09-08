export type Booking = {
  id: string; // UUID
  reference_no: string;
  created_at: string; // ISO timestamp
  booking_status: "Requested" | "Confirmed" | "Cancelled";
  booking_type: "Round Trip" | "Single";
  failure_cancellation_remarks?: string | null;
  is_booking_request?: boolean | null;
  approved_by_account_id?: string | null; // UUID
  bir_invoice_no?: string | null;
  cancellation_type?: string | null;
  remarks?: string | null;
  updated_at: string; // ISO timestamp
  has_passengers: boolean;
  has_cargo: boolean;
  source: string;
  booked_by_id?: string | null; // UUID, FK
};

export type Payment = {
  id: string; // UUID
  booking_id?: string | null; // UUID, FK to booking
  payment_status: "pending" | "completed" | "failed" | "refunded";
  total_price?: number | null;
  voucher_id?: number | null;
  price_without_markup?: number | null;
  payment_method:
    | "credit_card"
    | "debit_card"
    | "bank_transfer"
    | "cash"
    | "online_payment";
  payment_date?: string | null; // ISO timestamp
};

export type Disbursement = {
  id: string; // UUID
  official_receipt: string;
  paid_to: string;
  category_id: string; // UUID, FK to disbursement_category
  purpose?: string | null;
  amount: number; // double precision
  trip_id?: string | null; // UUID
  created_at: string; // ISO timestamp
};

export type DisbursementCategory = {
  id: string; // UUID
  name: string;
};

export type Port = {
  id: number; // SERIAL
  name: string;
  code: string; // unique
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export type Route = {
  id: number; // SERIAL
  src_port_id: number; // FK -> ports.id
  dest_port_id: number; // FK -> ports.id
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export type Ship = {
  id: number; // SERIAL
  name: string;
  vessel_type: "lct" | "roro" | "fastcraft" | "passenger";
  is_cargo: boolean;
  gross_tonnage?: number | null; // NUMERIC(10,2)
  net_tonnage?: number | null; // NUMERIC(10,2)
  status: "active" | "inactive" | "maintenance" | "decommissioned";
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export type Trip = {
  id: string; // UUID
  ship_id: number; // FK -> ships.id
  route_id: number; // FK -> routes.id
  scheduled_departure: string; // ISO timestamp
  scheduled_arrival: string; // ISO timestamp
  actual_departure?: string | null; // ISO timestamp
  actual_arrival?: string | null; // ISO timestamp
  reference_number: string; // unique
  is_seat_can_be_selected: boolean;
  booking_start_date: string; // ISO timestamp
  booking_cut_off_date: string; // ISO timestamp
  status: "scheduled" | "departed" | "arrived" | "cancelled" | "delayed";
  rate_table_id?: number | null;
  is_allow_online_booking: boolean;
  is_visible_to_travel_agency: boolean;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export type BookingTrip = {
  id: string; // UUID
  booking_id: string; // FK -> booking.bookings.id
  trip_id: string; // FK -> client.trips.id
  sequence: number;
  status?: string | null; // default 'Active'
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

export type BookingTripPassenger = {
  id: string; // UUID
  booking_trip_id: string; // FK -> booking.booking_trips.id
  passenger_id: string; // UUID
  seat_id?: string | null; // UUID
  cabin_id?: number | null;
  discount_type?: string | null;
  meal?: string | null;
  check_in_date?: string | null; // ISO timestamp
  removed_reason?: string | null;
  removed_reason_type?: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};
export type BookingTripCargo = {
  id: string; // UUID
  booking_trip_id: string; // FK -> booking.booking_trips.id
  cargo_id: string; // FK -> booking.cargos.id
  total_price?: number | null; // NUMERIC
  price_without_markup?: number | null; // NUMERIC
  check_in_date?: string | null; // ISO timestamp
  removed_reason?: string | null;
  removed_reason_type?: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};
export type BookingUser = {
  id: string; // UUID
  acc_type: "guest" | "external" | "registered";
  account_id?: string | null; // UUID
};

export type CargoParty = {
  id: string; // UUID
  party_name: string;
  email?: string | null;
  mobile_number?: string | null;
  address?: string | null;
  account_id?: string | null; // UUID
  passenger_id?: string | null; // UUID
};
export type CargoPartyAssignment = {
  cargo_id: string; // FK -> booking.cargos_old.id
  cargo_party_id: string; // FK -> booking.cargo_party.id
  party_role: string; // PARTY_ROLE (custom enum type in DB)
};
export type Cargo = {
  id: string; // UUID
  cargo_type: "rolling" | "loose";
  description?: string | null;
  weight?: number | null; // NUMERIC
  dimensions?: string | null;
  declared_value?: number | null; // NUMERIC
  special_handling?: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};
export type LooseCargo = {
  id: string; // UUID, FK -> cargos.id
  package_type?: string | null;
  quantity: number;
  weight?: number | null; // NUMERIC
};
export type Passenger = {
  id: string; // UUID
  user_id?: string | null; // UUID
  first_name: string;
  last_name: string;
  email?: string | null;
  occupation?: string | null;
  sex: "male" | "female" | "other";
  civil_status: "single" | "married" | "divorced" | "widowed";
  birthday: string; // ISO date
  address: string;
  nationality: string;
  mobile_number?: string | null;
};

export type RollingCargo = {
  id: string; // UUID, FK -> cargos.id
  vehicle_plate_number: string; // FK -> vehicles.plate_number
  weight?: number | null; // NUMERIC
  length?: number | null; // NUMERIC
  driver_id?: string | null; // UUID, FK -> passengers.id
};
