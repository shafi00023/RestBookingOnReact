const express = require("express");
const fs = require("fs").promises; // Use promises to avoid callback hell
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Allow requests from all origins
app.use(cors());

// Utility function to read JSON files
async function readJsonFile(filePath) {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

// Utility function to write JSON files
async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

app.post("/api/register", async (req, res) => {
  const { username, email, password, contact } = req.body;

  try {
    const users = await readJsonFile("db.json");
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password, contact });
    await writeJsonFile("db.json", users);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to handle POST requests to /api/users with credentials
app.post("/api/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await readJsonFile("db.json");

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json();
  } catch (error) {
    console.error("Error during user authentication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await readJsonFile("db.json");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to book a restaurant table
app.post("/api/book-table", async (req, res) => {
  const { name, email, date, time, partySize, bookingStatus } = req.body;

  try {
    let bookings = [];
    try {
      bookings = await readJsonFile("booking.json");
    } catch (error) {
      console.error("Error reading booking.json:", error);
    }

    const bookingId = generateBookingId();
    const newBooking = {
      bookingId,
      name,
      email,
      date,
      time,
      partySize,
      bookingStatus,
    };

    bookings.push(newBooking);
    await writeJsonFile("booking.json", bookings);

    res.status(201).json({ message: "Table booked successfully", bookingId });
  } catch (error) {
    console.error("Error booking table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to generate a unique booking ID
function generateBookingId() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Endpoint to handle booking updates
app.put("/api/bookings/:id", async (req, res) => {
  const bookingId = req.params.id;
  const updatedBooking = req.body;

  try {
    const bookings = await readJsonFile("booking.json");
    const bookingIndex = bookings.findIndex(
      (booking) => booking.bookingId == bookingId
    );

    if (bookingIndex === -1) {
      return res.status(404).json({ error: "Booking not found" });
    }

    bookings[bookingIndex] = { ...bookings[bookingIndex], ...updatedBooking };
    await writeJsonFile("booking.json", bookings);

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to fetch all bookings
app.get("/api/getBooking", async (req, res) => {
  try {
    const booking = await readJsonFile("booking.json");
    res.json(booking);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read existing tables from db.json file
let tables = [];
try {
  tables = readJsonFile("tables.json");
} catch (error) {
  console.error("Error reading tables.json:", error);
}

// Function to generate a unique ID
function generateId() {
  const maxId = tables.reduce(
    (max, table) => (table.id > max ? table.id : max),
    0
  );
  return maxId + 1;
}

app.post("/api/createTable", async (req, res) => {
  const { tableNo, capacity } = req.body;

  try {
    const id = generateId();
    const newTable = { id, tableNo, capacity };
    tables.push(newTable);
    await writeJsonFile("tables.json", tables);

    res.status(201).json({ message: "Table Created successfully" });
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/checkAvailability", async (req, res) => {
  try {
    const bookings = await readJsonFile("booking.json");
    const { date, time, partySize } = req.query;

    const bookingsOnDateTime = bookings.filter(
      (booking) => booking.date === date && booking.time === time
    );

    const availableTables = tables.filter(
      (table) => table.capacity >= partySize
    );

    const overlappingTables = availableTables.filter((table) => {
      return bookingsOnDateTime.some(
        (booking) => booking.tableno === table.tableNo
      );
    });

    const filteredTables = availableTables.filter(
      (table) => !overlappingTables.includes(table)
    );

    res.status(200).json(filteredTables.map((table) => table.tableNo));
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
