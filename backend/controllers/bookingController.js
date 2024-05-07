const Booking = require("../models/bookingsModel");
const BookingDTO = require('../DTO/bookingDTO');
const Stadium = require('../models/stadiumsModel');

async function userBookings(req, res, next) {
  try {
    // Access user information from req.user (added by the auth middleware)
    const userId = req.user._id;
    const bookings = await Booking.find({ userId });

    // Iterate over each booking and create a BookingDTO object
    const bookingsDTO = await Promise.all(bookings.map(async (booking) => {
        // Extract stadium ID and timeslot ID from the booking
        const stadiumId = booking.stadiumId;
        const timeSlotId = booking.timeSlotId; // Assuming this is the ID of the timeslot
        
        // Fetch stadium details using the stadium ID
        const stadium = await Stadium.findById(stadiumId);
        const stadiumName = stadium.name;
        const timeSlot = stadium.timeSlots.find(slot => slot._id.equals(timeSlotId));

        // // Fetch timeslot details using the timeslot ID
        // const timeSlot = await TimeSlot.findById(timeSlotId); // Adjust this according to your schema
        
        // Create a BookingDTO object
        return new BookingDTO(stadiumName, timeSlot);
      }));
    res.status(200).json(bookingsDTO);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
    return next(error);
  }
}

module.exports = {
  userBookings,
};
