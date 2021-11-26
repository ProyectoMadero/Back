const express = require('express');
const router = express.Router();
const controller =  require('./controller');

//USUARIOS
router.post('/registrar-huesped-wep', controller.postResgisterGuestWithExternalProvider);
router.post('/registrar-huesped', controller.postResgisterGuest);
router.post('/comprobar-registrowep-huesped', controller.postCheckDataHuesped);
router.post('/registrar-cumple-huesped', controller.postResgisterBirthday);
router.post('/comprobar-rol-usuario', controller.postCheckUserRol);

//HABITACIONES
router.get('/ver-habitaciones', controller.getRooms)
router.get('/ver-habitacion/:id', controller.getRoom);

//SERVICIOS
router.get('/ver-servicio/:id', controller.getService);
router.get('/ver-servicios', controller.getServices);

//PETICIONES
router.get('/ver-peticion/:id', controller.getRequest);
router.get('/ver-peticiones', controller.getRequests);

//OFERTAS
router.get('/ver-oferta/:id', controller.getOffer);
router.get('/ver-ofertas', controller.getOffers);

//Imagenes
router.get('/habitacion/img/:id', controller.getRoomImage);

module.exports = router;