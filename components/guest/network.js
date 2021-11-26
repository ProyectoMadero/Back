const express = require('express');
const router = express.Router();
const controller =  require('./controller');

//Reservaciones
router.post('/reservar-habitacion', controller.postReserveRoom);
router.put('/cambiar-estado-reservacion', controller.putChangeReservationStatus);

//Servicios
router.get('/ver-servicios', controller.getServices);

//Peticiones
router.get('/ver-peticiones', controller.getRequests);

//Favoritos
router.put('/agregar-habitacion-favorita', controller.inserFavoriteRoom);
router.put('/eliminar-habitacion-favorita', controller.removeFavoriteRoom);
router.get('/ver-habitaciones-favoritas/:id', controller.getFavoriteRooms);

module.exports = router;