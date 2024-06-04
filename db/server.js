const express = require("express");
const fs = require("fs");
const cors = require("cors"); // Import cors
const bcrypt = require("bcrypt");
const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Allow requests from all origins
app.use(cors());

app.post("/api/register", async (req, res) => {
  const { username, email, password, contact } = req.body;

  try {
    const users = JSON.parse(await fs.readFile("db.json", "utf8"));
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword, contact });
    await fs.writeFile("db.json", JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to handle POST requests to /api/users with credentials
app.post("/api/users", (req, res) => {
  const { email, password } = req.body;

  // Read users from db.json
  const users = JSON.parse(fs.readFileSync("db.json", "utf8"));

  // Find user with matching email and password
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Return the user details
  res.status(200).json(user);
});

// Endpoint to fetch all users
app.get("/api/users", (req, res) => {
  // Read users from db.json
  const users = JSON.parse(fs.readFileSync("db.json", "utf8"));
  console.log("users", users);
  res.json(users);
});

// Endpoint to book a restaurant table
app.post("/api/book-table", (req, res) => {
  const { name, email, date, time, partySize, bookingStatus } = req.body;

  // Read existing bookings from booking.json
  let bookings = [];
  try {
    bookings = JSON.parse(fs.readFileSync("booking.json", "utf8"));
  } catch (error) {
    console.error("Error reading booking.json:", error);
  }

  // Generate a unique booking ID
  const bookingId = generateBookingId();

  // Create new booking object
  const newBooking = {
    bookingId,
    name,
    email,
    date,
    time,
    partySize,
    bookingStatus,
  };

  // Add new booking to the bookings array
  bookings.push(newBooking);

  // Write updated bookings array back to booking.json
  fs.writeFileSync("booking.json", JSON.stringify(bookings, null, 2));

  res.status(201).json({ message: "Table booked successfully", bookingId });
});

// Function to generate a unique booking ID
function generateBookingId() {
  // Generate a random 6-digit number
  return Math.floor(100000 + Math.random() * 900000);
}

// Endpoint to handle booking updates
app.put("/api/bookings/:id", (req, res) => {
  const bookingId = req.params.id;
  const updatedBooking = req.body;

  // Read existing bookings from booking.json
  const bookings = JSON.parse(fs.readFileSync("booking.json", "utf8"));

  // Find the booking by ID
  const bookingIndex = bookings.findIndex(
    (booking) => booking.bookingId == bookingId
  );

  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  // Update the booking
  bookings[bookingIndex] = { ...bookings[bookingIndex], ...updatedBooking };

  // Write updated bookings array back to booking.json
  fs.writeFileSync("booking.json", JSON.stringify(bookings, null, 2));

  res.status(200).json({ message: "Booking updated successfully" });
});

// Endpoint to fetch all bookings
app.get("/api/getBooking", (req, res) => {
  const booking = JSON.parse(fs.readFileSync("booking.json", "utf8"));
  console.log("booking", booking);
  res.json(booking);
});

// Read existing tables from db.json file
let tables = JSON.parse(fs.readFileSync("tables.json", "utf8"));

// Function to generate a unique ID
function generateId() {
  // Find the maximum ID in the existing tables
  const maxId = tables.reduce(
    (max, table) => (table.id > max ? table.id : max),
    0
  );
  // Increment the maximum ID to generate a new unique ID
  return maxId + 1;
}

app.post("/api/createTable", (req, res) => {
  // Extract data from request body
  const { tableNo, capacity } = req.body;

  // Generate a unique ID
  const id = generateId();

  // Create new table object
  const newTable = { id, tableNo, capacity };

  // Add new table to tables array
  tables.push(newTable);

  // Write updated tables array back to db.json file
  fs.writeFileSync("tables.json", JSON.stringify(tables, null, 2), "utf8");

  // Return the newly created table
  res.status(201).json({ message: "Table Created successfully" });
});

app.get("/api/checkAvailability", (req, res) => {
  const bookings = JSON.parse(fs.readFileSync("booking.json", "utf8"));
  // const { date, time, partySize } = req.body;
  const { date, time, partySize } = req.query;

  const bookingsOnDateTime = bookings.filter(
    (booking) => booking.date === date && booking.time === time
  );

  const availableTables = tables.filter((table) => {
    return table.capacity >= partySize;
  });

  const overlappingTables = availableTables.filter((table) => {
    return bookingsOnDateTime.some(
      (booking) => booking.tableno === table.tableNo
    );
  });

  const filteredTables = availableTables.filter(
    (table) => !overlappingTables.includes(table)
  );

  res.status(200).json(filteredTables.map((table) => table.tableNo));
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
