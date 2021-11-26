const express = require('express');
const router = express.Router();
const controller =  require('./controller');

//EMPLEADOS 
router.post('/registrar-empleado', controller.postRegisterEmployee);
router.put('/actualizar-datos-empleado', controller.putUpdateEmployeeData)
router.put('/actualizar-email-empleado', controller.putUpdateEmployeeEmail)
router.put('/actualizar-estado-empleado', controller.putToggleStatusEmployee)
router.get('/ver-empleado/:id', controller.getEmployee);
router.get('/ver-empleados', controller.getEmployees);

module.exports = router;