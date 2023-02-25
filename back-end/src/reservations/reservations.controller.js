/**
 * List handler for reservation resources
 */
const service = require('./reservations.services');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res) {
  res.json({
    data: [{
      "reservation_id": 1,
      "first_name": "mel",
      "last_name": "panugaling",
      "mobile_number": "123456789",
      "reservation_date": "01-01-01",
      "reservation_time": "18:00",
      "people_count": 5
    }]
  });
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

// 

module.exports = {
  list,
  create,
  
};
