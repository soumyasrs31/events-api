const {
  getAllEvents,
  getEventById,
  createEvent,
} = require('../controllers/events');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyLogin = require('../middlewares/verifyLogin');

const router = require('express').Router();

// get all events
router.get('/', getAllEvents);

// get an event by id
router.get('/:id', getEventById);

// create an event
router.post('/', verifyAdmin, createEvent);

module.exports = router;
