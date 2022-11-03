const express = require('express')
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token');
const { listarTasks, crearTasks, actualizarTask, eliminarTask } = require('../Controllers/Task');

router.use ( validarJWT );

router.get('/', listarTasks)
router.post('/', crearTasks)
router.put('/:id', actualizarTask)
router.delete('/:id', eliminarTask)

module.exports = router;