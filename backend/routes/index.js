// backend/routes/index.js
const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');
const stadiumController = require('../controllers/stadiumController');
const router = express.Router();
const auth = require('../middlewares/userAuth');
const stadiumOwnerAuth = require('../middlewares/stadiumOwnerAuth');
const bookingController = require('../controllers/bookingController');

// Route to serve the index.html file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Logout route, calling authController middleware to verify user details
router.post('/logout', auth, authController.logout);

// Add/ Register Stadium route, calling stadiumOwnerAuth middleware to verify stadium owner credentials
router.post('/stadium/register', auth, stadiumController.registerStadium);

// Update stadium info route
router.put('/stadium/update', stadiumOwnerAuth, stadiumController.updateStadium);

// Search stadium by name
router.get('/stadium/search/name/:name', auth, stadiumController.searchStadiumByName);

// by location
router.get('/stadium/search/location/:location', auth, stadiumController.searchStadiumByLocation);

// by feature
router.get('/stadium/search/feature/:feature', auth, stadiumController.searchStadiumByFeature);

// get all stadiums
router.get('/stadium/all', stadiumController.getAllStadiums);

// delete stadium
router.delete('/stadium/delete/:stadiumId', stadiumOwnerAuth, stadiumController.deleteStadium);

// Book stadium (time-slot)
router.post('/stadium/book/:stadiumId/:timeSlotId', auth, stadiumController.bookStadium);

// User bookings
router.get('/myBookings', auth, bookingController.userBookings);

// Random stadiums
router.get('/stadium/random', stadiumController.getRandomStadiums);

// get stadium by id
router.get('/stadium/:id', stadiumController.getStadiumById);

// get stadiums by owner id
router.get('/myStadiums', stadiumOwnerAuth, stadiumController.getOwnerStadiums);

// add timeSlot
router.post('addTimeSlot/:stadiumId', stadiumOwnerAuth, stadiumController.addTimeSlot);

module.exports = router;
