/**
 * List handler for reservation resources
 */
const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

module.exports = {
  list,
};
