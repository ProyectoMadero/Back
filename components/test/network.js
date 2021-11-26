const express = require('express');
const router = express.Router();
const controller =  require('./controller');

// Datos aleatorios
router.get('/insert-rooms', controller.getInsertRooms);
router.get('/insert-services', controller.getInsertServices);
router.get('/insert-requests', controller.getInsertRequests);
router.get('/insert-offers', controller.getInsertOffers);

//Varios
router.post('/insert-guest-favorites', controller.postInsertFavorites);
router.post('/update-rooms-images', controller.getUpdateRoomsImages)
module.exports = router;