#!/usr/bin/env python3
"""
Database Population Script for Ferry Booking System
This script populates the database with sample data for all tables.
"""

import psycopg2
import uuid
from datetime import datetime, timedelta, date
import random
from decimal import Decimal

# Neon DB connection configuration
DATABASE_URL = 'postgresql://neondb_owner:npg_QwlOG01LPVtZ@ep-aged-unit-a1do7h9u-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
JWT_SECRET = '15aff553b71f2e2b6ef106014ff2b464b6ef0b4db6da34f7f862365b81548989948b5e91d3df18f443c0a810fef3178ac5770dedd28a7c8dd27c0f9791908a66'
TENANT_ID = '1'

def get_db_connection():
    """Create and return a database connection to Neon DB."""
    return psycopg2.connect(DATABASE_URL)

def populate_ports(conn):
    """Populate the ports table with sample data."""
    cursor = conn.cursor()
    
    ports_data = [
        ('Manila North Harbor', 'MNH'),
        ('Bataan Port', 'BTN'),
        ('Cebu Port', 'CEB'),
        ('Bohol Port', 'BOH'),
        ('Dumaguete Port', 'DUM'),
        ('Iloilo Port', 'ILO'),
        ('Bacolod Port', 'BAC'),
        ('Zamboanga Port', 'ZAM')
    ]
    
    for name, code in ports_data:
        cursor.execute(
            """INSERT INTO client.ports (name, code) VALUES (%s, %s) 
               ON CONFLICT (code) DO NOTHING RETURNING id""",
            (name, code)
        )
    
    conn.commit()
    print("✓ Populated ports table")

def populate_ships(conn):
    """Populate the ships table with sample data."""
    cursor = conn.cursor()
    
    ships_data = [
        ('MV Super Ferry 1', 'roro', False, 5000.50, 3000.25, 'active'),
        ('MV Fast Cat Express', 'fastcraft', False, 1200.75, 800.50, 'active'),
        ('MV Cargo Hauler', 'lct', True, 8000.00, 6000.00, 'active'),
        ('MV Island Princess', 'passenger', False, 2500.30, 1800.20, 'active'),
        ('MV Sea Voyager', 'roro', False, 4500.80, 3200.60, 'maintenance'),
    ]
    
    for name, vessel_type, is_cargo, gross_tonnage, net_tonnage, status in ships_data:
        cursor.execute(
            """INSERT INTO client.ships (name, vessel_type, is_cargo, gross_tonnage, net_tonnage, status) 
               VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
            (name, vessel_type, is_cargo, gross_tonnage, net_tonnage, status)
        )
    
    conn.commit()
    print("✓ Populated ships table")

def populate_routes(conn):
    """Populate the routes table with sample data."""
    cursor = conn.cursor()
    
    # Get port IDs
    cursor.execute("SELECT id, code FROM client.ports")
    ports = {code: port_id for port_id, code in cursor.fetchall()}
    
    routes_data = [
        (ports['MNH'], ports['CEB']),  # Manila to Cebu
        (ports['CEB'], ports['BOH']),  # Cebu to Bohol
        (ports['CEB'], ports['DUM']),  # Cebu to Dumaguete
        (ports['ILO'], ports['BAC']),  # Iloilo to Bacolod
        (ports['MNH'], ports['ZAM']),  # Manila to Zamboanga
    ]
    
    for src_port_id, dest_port_id in routes_data:
        cursor.execute(
            """INSERT INTO client.routes (src_port_id, dest_port_id) 
               VALUES (%s, %s) RETURNING id""",
            (src_port_id, dest_port_id)
        )
    
    conn.commit()
    print("✓ Populated routes table")

def populate_disbursement_categories(conn):
    """Populate disbursement categories."""
    cursor = conn.cursor()
    
    categories = [
        'Fuel Costs',
        'Port Fees',
        'Crew Salaries',
        'Maintenance',
        'Insurance',
        'Supplies',
        'Equipment'
    ]
    
    for category in categories:
        cursor.execute(
            """INSERT INTO client.disbursement_category (name) 
               VALUES (%s) ON CONFLICT (name) DO NOTHING""",
            (category,)
        )
    
    conn.commit()
    print("✓ Populated disbursement categories")

def populate_trips(conn):
    """Populate the trips table with sample data."""
    cursor = conn.cursor()
    
    # Get ship and route IDs
    cursor.execute("SELECT id FROM client.ships WHERE status = 'active'")
    ship_ids = [row[0] for row in cursor.fetchall()]
    
    cursor.execute("SELECT id FROM client.routes")
    route_ids = [row[0] for row in cursor.fetchall()]
    
    # Create trips for the next 30 days
    base_date = datetime.now().replace(hour=8, minute=0, second=0, microsecond=0)
    
    for i in range(30):  # 30 days of trips
        trip_date = base_date + timedelta(days=i)
        
        for j in range(2):  # 2 trips per day
            departure_time = trip_date + timedelta(hours=j*8)  # 8 AM and 4 PM
            arrival_time = departure_time + timedelta(hours=random.randint(2, 6))
            
            booking_start = departure_time - timedelta(days=7)
            booking_cutoff = departure_time - timedelta(hours=2)
            
            ship_id = random.choice(ship_ids)
            route_id = random.choice(route_ids)
            
            cursor.execute(
                """INSERT INTO client.trips 
                   (ship_id, route_id, scheduled_departure, scheduled_arrival, 
                    booking_start_date, booking_cut_off_date, reference_number, status)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                  ON CONFLICT (reference_number) DO NOTHING
                    RETURNING id""",
                (ship_id, route_id, departure_time, arrival_time, 
                 booking_start, booking_cutoff, f"TR{i:03d}{j}", 'scheduled')
            )
    
    conn.commit()
    print("✓ Populated trips table")
import uuid

def populate_booking_users(conn):
    """Populate booking_user table with valid sample data."""
    cursor = conn.cursor()

    # 1. Insert registered users into auth.users
    registered_users = [
        ('Regina Reyes', 'registered1@example.com', '09170000001'),
        ('Marco Martinez', 'registered2@example.com', '09170000002'),
    ]
    registered_user_ids = []
    for name, email, phone in registered_users:
        cursor.execute(
            """INSERT INTO auth.users (name, email, phone)
               VALUES (%s, %s, %s)
               ON CONFLICT (email) DO NOTHING
               RETURNING id""",
            (name, email, phone)
        )
        row = cursor.fetchone()
        if row:
            user_id = row[0]
        else:
            cursor.execute("SELECT id FROM auth.users WHERE email = %s", (email,))
            user_id = cursor.fetchone()[0]
        registered_user_ids.append(user_id)

    # 2. Insert external users into auth.external_users
    external_users = [
        ('ext1@example.com', 'Alice', 'Anderson', '09170000011'),
        ('ext2@example.com', 'Bob', 'Brown', '09170000012'),
    ]
    external_user_ids = []
    for email, fname, lname, phone in external_users:
        cursor.execute(
            """INSERT INTO auth.external_users (external_account_id, email, first_name, last_name, phone)
               VALUES (%s, %s, %s, %s, %s)
               ON CONFLICT (email) DO NOTHING
               RETURNING id""",
            (str(uuid.uuid4()), email, fname, lname, phone)
        )
        row = cursor.fetchone()
        if row:
            ext_id = row[0]
        else:
            cursor.execute("SELECT id FROM auth.external_users WHERE email = %s", (email,))
            ext_id = cursor.fetchone()[0]
        external_user_ids.append(ext_id)

    # 3. Insert into booking.booking_user with correct references
    users_data = [
        ('guest', str(uuid.uuid4())),                 # guest can use random uuid
        ('registered', registered_user_ids[0]),       # must point to auth.users.id
        ('registered', registered_user_ids[1]),
        ('external', external_user_ids[0]),           # must point to auth.external_users.id
        ('external', external_user_ids[1]),
    ]

    for acc_type, account_id in users_data:
        cursor.execute(
            """INSERT INTO booking.booking_user (acc_type, account_id)
               VALUES (%s, %s)
               ON CONFLICT (acc_type, account_id) DO NOTHING
               RETURNING id""",
            (acc_type, account_id)
        )
        cursor.fetchone()  # not critical, ignore None if skipped

    conn.commit()
    print("✓ Populated booking_user table with guests, registered, and external users")


def populate_bookings(conn):
    """Populate bookings table with sample data (dates spread between 2024 and Sep 2025)."""
    cursor = conn.cursor()
    
    # Get booking user IDs
    cursor.execute("SELECT id FROM booking.booking_user")
    user_ids = [row[0] for row in cursor.fetchall()]
    
    booking_statuses = ['Requested', 'Confirmed', 'Cancelled']
    booking_types = ['Round Trip', 'Single']
    sources = ['website', 'mobile_app', 'walk_in', 'travel_agency']
    
    start_date = datetime(2024, 1, 1)
    end_date = datetime(2025, 9, 30)
    delta_days = (end_date - start_date).days
    
    for i in range(50):  # Create 50 bookings for better distribution
        created_at = start_date + timedelta(days=random.randint(0, delta_days))
        
        cursor.execute(
            """INSERT INTO booking.bookings 
               (reference_no, booking_status, booking_type, has_passengers, 
                has_cargo, source, booked_by_id, created_at)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (f"BK{i:06d}", random.choice(booking_statuses), 
             random.choice(booking_types), True, 
             random.choice([True, False]), random.choice(sources), 
             random.choice(user_ids), created_at)
        )
    
    conn.commit()
    print("✓ Populated bookings table with random created_at between Jan 2024 – Sep 2025")

def populate_passengers(conn):
    """Populate passengers table with sample data."""
    cursor = conn.cursor()
    
    passengers_data = [
        ('Alice', 'Johnson', 'alice.johnson@email.com', 'Student', 'female', 'single',
         date(1995, 3, 12), '321 Elm St, Bohol', 'Filipino', '09156789123'),
        ('Bob', 'Brown', 'bob.brown@email.com', 'Driver', 'male', 'married',
         date(1980, 7, 8), '654 Maple Ave, Iloilo', 'Filipino', '09167891234'),
        ('Carol', 'Davis', 'carol.davis@email.com', 'Nurse', 'female', 'divorced',
         date(1988, 11, 25), '987 Cedar Rd, Dumaguete', 'Filipino', '09178912345'),
    ]
    
    for fname, lname, email, occupation, sex, civil_status, birthday, address, nationality, mobile in passengers_data:
        cursor.execute(
            """INSERT INTO booking.passengers 
               (first_name, last_name, email, occupation, sex, civil_status, 
                birthday, address, nationality, mobile_number)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (fname, lname, email, occupation, sex, civil_status, birthday, address, nationality, mobile)
        )
    
    conn.commit()
    print("✓ Populated passengers table")

def populate_cargos(conn):
    """Populate cargos table with sample data."""
    cursor = conn.cursor()
    
    cargos_data = [
        ('rolling', 'Motorcycle Honda Wave', 120.5, '2m x 1m x 1.2m', 50000.00, 'Handle with care'),
        ('loose', 'Rice Sacks', 500.0, '50 sacks', 25000.00, 'Keep dry'),
        ('rolling', 'Toyota Vios', 1200.0, '4.5m x 1.7m x 1.5m', 800000.00, 'Standard handling'),
        ('loose', 'Construction Materials', 2000.0, 'Various sizes', 15000.00, 'Heavy lifting required'),
    ]
    
    for cargo_type, desc, weight, dimensions, declared_value, special_handling in cargos_data:
        cursor.execute(
            """INSERT INTO booking.cargos 
               (cargo_type, description, weight, dimensions, declared_value, special_handling)
               VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
            (cargo_type, desc, weight, dimensions, declared_value, special_handling)
        )
    
    conn.commit()
    print("✓ Populated cargos table")

def populate_booking_trips(conn):
    """Populate booking_trips table with sample data."""
    cursor = conn.cursor()
    
    # Get booking and trip IDs
    cursor.execute("SELECT id FROM booking.bookings LIMIT 10")
    booking_ids = [row[0] for row in cursor.fetchall()]
    
    cursor.execute("SELECT id FROM client.trips LIMIT 20")
    trip_ids = [row[0] for row in cursor.fetchall()]
    
    for i, booking_id in enumerate(booking_ids):
        # Create 1-2 trips per booking
        num_trips = random.choice([1, 2])
        for seq in range(num_trips):
            cursor.execute(
                """INSERT INTO booking.booking_trips 
                   (booking_id, trip_id, sequence)
                   VALUES (%s, %s, %s) RETURNING id""",
                (booking_id, random.choice(trip_ids), seq + 1)
            )
    
    conn.commit()
    print("✓ Populated booking trips table")

def populate_payments(conn):
    """Populate payments table with sample data."""
    cursor = conn.cursor()
    
    # Get booking IDs
    cursor.execute("SELECT id FROM booking.bookings")
    booking_ids = [row[0] for row in cursor.fetchall()]
    
    payment_methods = ['credit_card', 'debit_card', 'bank_transfer', 'cash', 'online_payment']
    payment_statuses = ['pending', 'completed', 'failed', 'refunded']
    
    for booking_id in booking_ids[:15]:  # Create payments for first 15 bookings
        total_price = random.uniform(1000, 10000)
        markup = random.uniform(100, 500)
        
        cursor.execute(
            """INSERT INTO booking.payment 
               (booking_id, payment_status, total_price, price_without_markup, 
                payment_method, payment_date)
               VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
            (booking_id, random.choice(payment_statuses), 
             round(total_price, 2), round(total_price - markup, 2),
             random.choice(payment_methods), 
             datetime.now() - timedelta(days=random.randint(1, 30)))
        )
    
    conn.commit()
    print("✓ Populated payments table")

def populate_booking_trip_passengers(conn):
    """Populate booking_trip_passengers table with sample data."""
    cursor = conn.cursor()
    
    # Get booking_trip and passenger IDs
    cursor.execute("SELECT id FROM booking.booking_trips")
    booking_trip_ids = [row[0] for row in cursor.fetchall()]
    
    cursor.execute("SELECT id FROM booking.passengers")
    passenger_ids = [row[0] for row in cursor.fetchall()]
    
    discount_types = ['Senior', 'PWD', 'Student', 'Regular']
    meals = ['Breakfast', 'Lunch', 'Dinner', 'None']
    
    for i, booking_trip_id in enumerate(booking_trip_ids[:10]):
        cursor.execute(
            """INSERT INTO booking.booking_trip_passengers 
               (booking_trip_id, passenger_id, discount_type, meal)
               VALUES (%s, %s, %s, %s)
                ON CONFLICT (booking_trip_id, passenger_id) DO NOTHING
                  RETURNING id""",
            (booking_trip_id, passenger_ids[i % len(passenger_ids)], 
             random.choice(discount_types), random.choice(meals))
        )
    
    conn.commit()
    print("✓ Populated booking trip passengers table")

def populate_booking_trip_cargos(conn):
    """Populate booking_trip_cargos table with sample data."""
    cursor = conn.cursor()
    
    # Get booking_trip and cargo IDs
    cursor.execute("SELECT id FROM booking.booking_trips")
    booking_trip_ids = [row[0] for row in cursor.fetchall()]
    
    cursor.execute("SELECT id FROM booking.cargos")
    cargo_ids = [row[0] for row in cursor.fetchall()]
    
    for i, booking_trip_id in enumerate(booking_trip_ids[:5]):  # Only some trips have cargo
        total_price = random.uniform(2000, 15000)
        markup = random.uniform(200, 1000)
        
        cursor.execute(
            """INSERT INTO booking.booking_trip_cargos 
               (booking_trip_id, cargo_id, total_price, price_without_markup)
               VALUES (%s, %s, %s, %s)
                ON CONFLICT (booking_trip_id, cargo_id) DO NOTHING RETURNING id""",
            (booking_trip_id, cargo_ids[i % len(cargo_ids)], 
             round(total_price, 2), round(total_price - markup, 2))
        )
    
    conn.commit()
    print("✓ Populated booking trip cargos table")

def populate_disbursements(conn):
    """Populate disbursements table with sample data."""
    cursor = conn.cursor()
    
    # Get category and trip IDs
    cursor.execute("SELECT id FROM client.disbursement_category")
    category_ids = [row[0] for row in cursor.fetchall()]
    
    cursor.execute("SELECT id FROM client.trips LIMIT 10")
    trip_ids = [row[0] for row in cursor.fetchall()]
    
    disbursements_data = [
        ('OR-001', 'Shell Philippines', 'Fuel for voyage', 15000.50),
        ('OR-002', 'Manila Port Authority', 'Port docking fees', 2500.00),
        ('OR-003', 'Ship Supplies Inc', 'Food and beverages', 8000.75),
        ('OR-004', 'Marine Services Co', 'Engine maintenance', 12000.00),
        ('OR-005', 'Insurance Corp', 'Monthly premium', 5500.25),
    ]
    
    for i, (receipt, paid_to, purpose, amount) in enumerate(disbursements_data):
        cursor.execute(
            """INSERT INTO client.disbursement 
               (official_receipt, paid_to, category_id, purpose, amount, trip_id)
               VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
            (receipt, paid_to, random.choice(category_ids), purpose, amount,
             trip_ids[i % len(trip_ids)] if i < len(trip_ids) else None)
        )
    
    conn.commit()
    print("✓ Populated disbursement table")

def main():
    """Main function to populate all tables."""
    print("🚢 Starting database population for Ferry Booking System...")
    print("📡 Connecting to Neon DB...")
    
    try:
        with get_db_connection() as conn:
            print("✅ Connected to database successfully!")
            
            # Populate tables in dependency order
            populate_ports(conn)
            populate_ships(conn)
            populate_routes(conn)
            populate_disbursement_categories(conn)
            populate_trips(conn)
            # populate_booking_users(conn)
            populate_bookings(conn)
            populate_passengers(conn)
            populate_cargos(conn)
            populate_booking_trips(conn)
            populate_payments(conn)
            populate_booking_trip_passengers(conn)
            populate_booking_trip_cargos(conn)
            populate_disbursements(conn)
            
            print("\n🎉 Database population completed successfully!")
            print("📊 Summary:")
            
            # Print summary statistics
            cursor = conn.cursor()
            tables = [
                ('client.ports', 'Ports'),
                ('client.ships', 'Ships'),
                ('client.routes', 'Routes'),
                ('client.trips', 'Trips'),
                ('booking.booking_user', 'Booking Users'),
                ('booking.bookings', 'Bookings'),
                ('booking.passengers', 'Passengers'),
                ('booking.cargos', 'Cargos'),
                ('booking.payment', 'Payments'),
                ('client.disbursement', 'Disbursements')
            ]
            
            for table_name, display_name in tables:
                cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
                count = cursor.fetchone()[0]
                print(f"   • {display_name}: {count} records")
                
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n📝 Configuration:")
        print(f"   • Database URL: {DATABASE_URL}")
        print(f"   • Tenant ID: {TENANT_ID}")
        print("\n🔧 Troubleshooting:")
        print("1. Verify your Neon database is accessible")
        print("2. Check that all table schemas are created")
        print("3. Ensure psycopg2-binary is installed: pip install psycopg2-binary")
        print("4. Verify the connection string format is correct")

if __name__ == "__main__":
    with get_db_connection() as conn:
        populate_bookings(conn)