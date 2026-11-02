const Plato = require('../models/Plato');

// Convierte los errores de Mongoose en respuestas claras para el cliente
function manejarError(res, error) {
  if (error.name === 'ValidationError') {
    const detalles = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Datos inválidos', detalles });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'El id no tiene un formato válido' });
  }
  if (error.code === 11000) {
    return res.status(409).json({ error: 'Ya existe un plato con ese nombre' });
  }
  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

// GET /api/platos -> lista todos, con filtros opcionales
// Ejemplo: /api/platos?veganos=true&maxCalorias=500
async function listar(req, res) {
  try {
    const { celiacos, veganos, diabeticos, maxCalorias } = req.query;
    const filtro = {};

    if (celiacos) filtro.aptoCeliacos = celiacos === 'true';
    if (veganos) filtro.aptoVeganos = veganos === 'true';
    if (diabeticos) filtro.aptoDiabeticos = diabeticos === 'true';
    if (maxCalorias) filtro.calorias = { $lte: Number(maxCalorias) };

    const platos = await Plato.find(filtro).sort({ nombre: 1 });
    res.json(platos);
  } catch (error) {
    manejarError(res, error);
  }
}

// GET /api/platos/:id -> trae un plato por su _id
async function obtenerPorId(req, res) {
  try {
    const plato = await Plato.findById(req.params.id);
    if (!plato) return res.status(404).json({ error: 'Plato no encontrado' });
    res.json(plato);
  } catch (error) {
    manejarError(res, error);
  }
}

// POST /api/platos -> alta de un plato
async function crear(req, res) {
  try {
    const plato = await Plato.create(req.body);
    res.status(201).json(plato);
  } catch (error) {
    manejarError(res, error);
  }
}

// PUT /api/platos/:id -> modificación de un plato
async function actualizar(req, res) {
  try {
    const plato = await Plato.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!plato) return res.status(404).json({ error: 'Plato no encontrado' });
    res.json(plato);
  } catch (error) {
    manejarError(res, error);
  }
}

// DELETE /api/platos/:id -> baja de un plato
async function eliminar(req, res) {
  try {
    const plato = await Plato.findByIdAndDelete(req.params.id);
    if (!plato) return res.status(404).json({ error: 'Plato no encontrado' });
    res.json({ mensaje: 'Plato eliminado', plato });
  } catch (error) {
    manejarError(res, error);
  }
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };