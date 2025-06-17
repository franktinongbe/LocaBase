const express = require('express');
const {
  createHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createHotel);
router.get('/', getAllHotels);
router.get('/:id', getHotel);
router.put('/:id', verifyToken, updateHotel);
router.delete('/:id', verifyToken, deleteHotel);

module.exports = router;
