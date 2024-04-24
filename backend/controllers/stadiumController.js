const Stadium = require("../models/stadiumsModel");
const StadiumDTO = require("../DTO/stadiumDTO");
const User = require('../models/userModel')
const Joi = require("joi");
const Booking = require("../models/bookingsModel");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

// Define the Joi schema for a single time slot
// const timeSlotJoiSchema = Joi.object({
//   day: Joi.string()
//     .valid(
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday"
//     )
//     .required(),
//   startTime: Joi.string()
//     .regex(/^(1[012]|0?[1-9]):[0-5][0-9]\s(?:AM|PM)$/)
//     .required(),
//   endTime: Joi.string()
//     .regex(/^(1[012]|0?[1-9]):[0-5][0-9]\s(?:AM|PM)$/)
//     .required(),
//   isBooked: Joi.boolean(),
// }).custom((value, helpers) => {
//   // Custom validation function to ensure start time is less than end time
//   const { startTime, endTime } = value;

//   // Convert start and end times to minutes for comparison
//   const startMinutes = convertTimeToMinutes(startTime);
//   const endMinutes = convertTimeToMinutes(endTime);

//   // Calculate the difference in minutes
//   const timeDifference = endMinutes - startMinutes;

//   // Check if the difference is less than 6 hours (360 minutes)
//   if (timeDifference >= 360) {
//     return helpers.error("any.invalid", {
//       message: "Time slot duration must be less than 6 hours",
//     });
//   }

//   return value;
// }, "Time slot duration validation");

// // Helper function to convert time to minutes
// const convertTimeToMinutes = (time) => {
//   // Split the time string into hours and minutes
//   const [hoursStr, minutesStr] = time.split(":");

//   // Parse hours and minutes as integers
//   const hours = parseInt(hoursStr, 10);
//   const minutes = parseInt(minutesStr, 10);

//   // Convert hours and minutes to total minutes
//   return hours * 60 + minutes;
// };

// Define the Joi schema for the timeSlot
const timeSlotJoiSchema = Joi.object({
  startTime: Joi.object({
    day: Joi.number().integer().min(0).max(6).required(), // Representing day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required() // Assuming time is in HH:mm format
  }).required(),
  endTime: Joi.object({
    day: Joi.number().integer().min(0).max(7).required(), // Representing day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required() // Assuming time is in HH:mm format
  }).required()
}).custom((value, helpers) => {
  const { startTime, endTime } = value;

  // Check if endTime day is either the same as startTime or one day ahead
  if (endTime.day !== startTime.day && endTime.day !== (startTime.day + 1) % 7) {
    return helpers.error("any.invalid", {
      message: "endTime day must be the same as startTime or one day ahead",
    });
  }

  // Calculate the difference in minutes between startTime and endTime
  const startMinutes = convertToMinutes(startTime.time);
  const endMinutes = convertToMinutes(endTime.time);
  const diffInMinutes = endMinutes - startMinutes;

  // Check if the time difference is less than or equal to 24 hours
  if (diffInMinutes <= 0 || diffInMinutes > 24 * 60) {
    return helpers.error("any.invalid", {
      message: "Time difference between startTime and endTime must be between 1 minute and 24 hours",
    });
  }

  return value;
}, 'custom endTime validation');

// Custom function to convert time to minutes
function convertToMinutes(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}


async function registerStadium(req, res, next) {
  // Input validation
  const stadiumRegisterationSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    ownerId: Joi.string().pattern(mongodbIdPattern),
    features: Joi.array().items(Joi.string().trim().max(100)).default([]),
    timeSlots: Joi.array().items(timeSlotJoiSchema).required(),
  });
  const { error } = stadiumRegisterationSchema.validate(req.body);

  // 2. if error in validation -> return error via middleware
  if (error) {
    return next(error);
  }
  try {
    // Access user information from req.user (added by the auth middleware)
    const userId = req.user._id;

    // Extract stadium data from req.body
    const { name, location, features, timeSlots } = req.body;

    // Create a new Stadium instance
    const newStadium = new Stadium({
      name,
      location,
      ownerId: userId, // Set ownerId to the authenticated user's userId
      features,
      timeSlots,
    });

    makeUserStadiumOwner(userId);
    // Save the stadium to the database
    const savedStadium = await newStadium.save();

    const stadiumDTO = new StadiumDTO(savedStadium);

    res.status(201).json(stadiumDTO);
  } catch (error) {
    // Handle errors using next(error)
    return next(error);
  }
}

const makeUserStadiumOwner = async (userId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Set the isStadiumOwner field to true
    user.isStadiumOwner = true;

    // Save the updated user
    await user.save();

  } catch (error) {
    console.error('Error making user a stadium owner:', error);
    throw error;
  }
};

async function updateStadium(req, res, next) {
  // Input validation
  const stadiumRegisterationSchema = Joi.object({
    name: Joi.string(),
    location: Joi.string(),
    features: Joi.array().items(Joi.string().trim().max(100)).default([]),
    timeSlots: Joi.array().items(timeSlotJoiSchema),
    stadiumId: Joi.string().pattern(mongodbIdPattern).required(),
  });
  const { error } = stadiumRegisterationSchema.validate(req.body);

  // 2. if error in validation -> return error via middleware
  if (error) {
    return next(error);
  }

  try {
    const { name, location, stadiumId, features } = req.body;

    let stadium;

    try {
      stadium = await Stadium.findOne({ _id: stadiumId });
    } catch (error) {
      return next(error);
    }

    const updatedDtadium = await Stadium.updateOne(
      { _id: stadiumId },
      {
        name,
        location,
        features,
      }
    );
    if (!stadium) {
      return res.status(404).json({ message: "Stadium not found" });
    }

    res.status(200).json(updatedDtadium);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
    return next(err);
  }
}

async function searchStadiumByName(req, res, next) {
  try {
    // Validate name
    const idValidationSchema = Joi.object({
      name: Joi.string().required(),
    });

    const { error } = idValidationSchema.validate(req.params);

    if (error) {
      return next(error);
    }
    const { name } = req.params;

    // Using find to search for stadiums by name
    const stadiums = await Stadium.find({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json(stadiums);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

async function searchStadiumByLocation(req, res, next) {
  try {
    // Validate location
    const idValidationSchema = Joi.object({
      location: Joi.string().required(),
    });

    const { error } = idValidationSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { location } = req.params;
    // Using find to search for stadiums by location
    const stadiums = await Stadium.find({
      location: { $regex: location, $options: "i" },
    });

    res.status(200).json(stadiums);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

async function searchStadiumByFeature(req, res, next) {
  try {
    // Validate feature
    const idValidationSchema = Joi.object({
      feature: Joi.string().required(),
    });

    const { error } = idValidationSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { feature } = req.params;
    // Using find to search for stadiums by features
    const stadiums = await Stadium.find({
      features: { $elemMatch: { $regex: new RegExp(feature, "i") } },
    });

    res.status(200).json(stadiums);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

async function deleteStadium(req, res, next) {
  try {
    // Validate Id
    const idValidationSchema = Joi.object({
      stadiumId: Joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = idValidationSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { stadiumId } = req.params;

    // Using findOneAndDelete to find the stadium by ID and delete it
    const deletedStadium = await Stadium.findOneAndDelete({ _id: stadiumId });

    if (!deletedStadium) {
      throw new Error("Stadium not found");
    }
    const stadium = new StadiumDTO(deletedStadium);
    res.json(deletedStadium);

    // return deletedStadium;
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

async function bookStadium(req, res, next) {
  // Validate Id
  const idValidationSchema = Joi.object({
    stadiumId: Joi.string().regex(mongodbIdPattern).required(),
    timeSlotId: Joi.string().required()
  });

  const { error } = idValidationSchema.validate(req.params);

  if (error) {
    return next(error);
  }

  const { stadiumId, timeSlotId } = req.params;

  const userId = req.user._id;

  try {
    // Check if the timeslot is available
    const stadium = await Stadium.findById(stadiumId);
    if (!stadium) {
      throw new Error("Stadium not found");
    }

    // Check if the time slot exists within the stadium
    const timeSlot = stadium.timeSlots.find(slot => slot._id.equals(timeSlotId));
    if (!timeSlot) {
        throw new Error('Time slot not found for this stadium');
    }

    // Check if the time slot is already booked
    if (timeSlot.isBooked) {
        throw new Error('Time slot is already booked');
    }

    // Update the isBooked value of the time slot to true
    timeSlot.isBooked = true;

    // Create the booking
    const booking = new Booking({
      stadiumId,
      userId,
      timeSlotId,
    });

    // Save the changes to the stadium and create the booking
    await stadium.save();
    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    return next(error);
  }
}

const createBooking = async (stadiumId, userId, startTime, endTime) => {
  try {
    // Check if the timeslot is available
    const stadium = await Stadium.findById(stadiumId);
    if (!stadium) {
      throw new Error("Stadium not found");
    }

    let timeslot;

    for (let i = 0; i < stadium.timeSlots.length; i++) {
      const slot = stadium.timeSlots[i];
      if (
        slot.startTime === startTime &&
        slot.endTime === endTime &&
        !slot.isBooked
      ) {
        timeslot = slot;
        break; // Stop looping once a matching timeslot is found
      }
    }

    if (!timeslot) {
      throw new Error("Timeslot is already booked or not available");
    }

    // Mark the timeslot as booked
    timeslot.isBooked = true;

    // Create the booking
    const booking = new Booking({
      stadiumId,
      userId,
      startTime,
      endTime,
    });

    // Save the changes to the stadium and create the booking
    await stadium.save();
    const savedBooking = await booking.save();

    return savedBooking;
  } catch (error) {
    throw error;
  }
};

async function getAllStadiums(req, res, next) {
  try {
    // Fetch all stadiums from the database
    const stadiums = await Stadium.find();

    res.status(200).json(stadiums);
  } catch (error) {
    // Handle errors
    console.error("Error fetching stadiums:", error);
    return next(error);
  }
}

module.exports = {
  registerStadium,
  updateStadium,
  searchStadiumByName,
  searchStadiumByLocation,
  searchStadiumByFeature,
  deleteStadium,
  bookStadium,
  getAllStadiums,
};
