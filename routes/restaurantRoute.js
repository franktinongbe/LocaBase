const express = require('express');
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurant);
router.put('/:id', verifyToken, updateRestaurant);
router.delete('/:id', verifyToken, deleteRestaurant);

module.exports = router;
