const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    return res.status(200).json({
      message: 'Events fetched succesfully',
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    return res.status(200).json({
      message: 'Event fetched succesfully',
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);

    await newEvent.save();

    return res.status(200).json({
      message: 'Event created succesfully',
      event: newEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
