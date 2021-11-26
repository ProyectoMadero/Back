const express = require('express');
const router = express.Router();
const controller =  require('./controller');
const upload = require('../../middlewares/uploadRoomPictures')

//HABITACIONES
router.post('/agregar-datos-habitacion', controller.postInsertRoom);
router.post('/agregar-imagenes-habitacion/:id', upload.array('images'), controller.postInsertRoomImages);
router.put('/editar-datos-habitacion', controller.putUpdateRoom);
router.put('/editar-imagenes-habitacion/:id', upload.array('images'), controller.putUpdateRoomImages);
router.delete('/eliminar-habitacion/:id', controller.deleteRoom);
router.get('/ver-habitaciones', controller.getRooms)
router.get('/ver-habitacion/:id', controller.getRoom);

//HUESPEDES
router.post('/registrar-huesped-wep', controller.postRegisterGuestWithExternalProvider);
router.post('/registrar-huesped', controller.postRegisterGuest)
router.get('/ver-huesped/:id', controller.getGuest);
router.get('/ver-huespedes', controller.getGuests);

//SERVICIOS
router.post('/agregar-servicio', controller.postInsertService);
router.put('/actualizar-datos-servicio', controller.putEditService);
router.put('/actualizar-estado-servicio', controller.putChangeStatusService);
router.get('/ver-servicio/:id', controller.getService);
router.get('/ver-servicios', controller.getServices);

//PETICIONES
router.post('/agregar-peticion', controller.postInsertRequest);
router.put('/actualizar-datos-peticion', controller.putEditRequest);
router.put('/actualizar-estado-peticion', controller.putChangeStatusRequest);
router.get('/ver-peticion/:id', controller.getRequest);
router.get('/ver-peticiones', controller.getRequests);

//OFERTAS
router.post('/agregar-oferta', controller.postInsertOffer);
router.put('/actualizar-datos-oferta', controller.putEditOffer);
router.put('/actualizar-estado-oferta', controller.putChangeStatusOffer);
router.get('/ver-oferta/:id', controller.getOffer);
router.get('/ver-ofertas', controller.getOffers);

module.exports = router;