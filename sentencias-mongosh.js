// =====================================================
// Sentencias MongoDB (mongosh) - Base: restaurante
// Colección: platos
// =====================================================

// ===== CREACIÓN =====
// En un archivo no funciona "use restaurante" (es un atajo de la consola),
// por eso se selecciona la base con getSiblingDB
db = db.getSiblingDB("restaurante");

db.createCollection("platos");

// ===== ALTAS =====
// insertOne: inserta un solo plato
db.platos.insertOne({
  nombre: "Milanesa napolitana con papas fritas",
  descripcion: "Milanesa de ternera con salsa de tomate, jamón y muzzarella gratinada, con papas fritas.",
  ingredientes: ["carne de ternera", "pan rallado", "huevo", "salsa de tomate", "jamón", "muzzarella", "papas"],
  precio: 14500,
  aptoCeliacos: false,
  aptoVeganos: false,
  aptoDiabeticos: false,
  calorias: 980,
  imagen: "https://placehold.co/600x400?text=Milanesa+napolitana"
});

// insertMany: inserta los otros 9 platos
db.platos.insertMany([
  { nombre: "Empanadas de carne (x3)", descripcion: "Tres empanadas de carne cortada a cuchillo, al horno.", ingredientes: ["harina de trigo", "carne vacuna", "cebolla", "huevo", "aceitunas", "comino"], precio: 7800, aptoCeliacos: false, aptoVeganos: false, aptoDiabeticos: false, calorias: 750, imagen: "https://placehold.co/600x400?text=Empanadas" },
  { nombre: "Ensalada César", descripcion: "Lechuga romana, pollo grillado, croutons, parmesano y aderezo César.", ingredientes: ["lechuga romana", "pollo", "croutons", "queso parmesano", "aderezo César"], precio: 9200, aptoCeliacos: false, aptoVeganos: false, aptoDiabeticos: true, calorias: 420, imagen: "https://placehold.co/600x400?text=Ensalada+Cesar" },
  { nombre: "Risotto de hongos", descripcion: "Arroz carnaroli cremoso con hongos de pino y parmesano.", ingredientes: ["arroz carnaroli", "hongos de pino", "cebolla", "caldo de verduras", "queso parmesano", "manteca"], precio: 12800, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: false, calorias: 620, imagen: "https://placehold.co/600x400?text=Risotto" },
  { nombre: "Bife de chorizo con ensalada mixta", descripcion: "Bife de chorizo a la parrilla con lechuga, tomate y cebolla.", ingredientes: ["bife de chorizo", "lechuga", "tomate", "cebolla", "aceite de oliva"], precio: 18900, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: true, calorias: 700, imagen: "https://placehold.co/600x400?text=Bife+de+chorizo" },
  { nombre: "Ñoquis con salsa pomodoro", descripcion: "Ñoquis de papa caseros con salsa de tomate fresco y albahaca.", ingredientes: ["papa", "harina de trigo", "tomate", "ajo", "albahaca", "aceite de oliva"], precio: 10500, aptoCeliacos: false, aptoVeganos: true, aptoDiabeticos: false, calorias: 650, imagen: "https://placehold.co/600x400?text=Noquis" },
  { nombre: "Wok de vegetales con tofu", descripcion: "Salteado de vegetales y tofu con salsa tamari y arroz blanco.", ingredientes: ["tofu", "brócoli", "zanahoria", "morrón", "salsa tamari", "arroz"], precio: 11200, aptoCeliacos: true, aptoVeganos: true, aptoDiabeticos: false, calorias: 520, imagen: "https://placehold.co/600x400?text=Wok+de+vegetales" },
  { nombre: "Hummus con bastones de vegetales", descripcion: "Hummus de garbanzos con bastones de zanahoria, apio y pepino.", ingredientes: ["garbanzos", "tahini", "limón", "ajo", "zanahoria", "apio", "pepino"], precio: 6900, aptoCeliacos: true, aptoVeganos: true, aptoDiabeticos: true, calorias: 350, imagen: "https://placehold.co/600x400?text=Hummus" },
  { nombre: "Provoleta a la parrilla", descripcion: "Queso provolone a la parrilla con orégano y aceite de oliva.", ingredientes: ["queso provolone", "orégano", "ají molido", "aceite de oliva"], precio: 8400, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: true, calorias: 450, imagen: "https://placehold.co/600x400?text=Provoleta" },
  { nombre: "Flan casero con dulce de leche", descripcion: "Flan de huevo casero con caramelo y dulce de leche.", ingredientes: ["huevo", "leche", "azúcar", "vainilla", "dulce de leche"], precio: 5600, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: false, calorias: 480, imagen: "https://placehold.co/600x400?text=Flan" }
]);

// Comprobación: tiene que dar 10
db.platos.countDocuments();

// ===== LECTURAS =====
// Todos los platos (SELECT * FROM platos)
db.platos.find();

// Solo los veganos (WHERE aptoVeganos = true)
db.platos.find({ aptoVeganos: true });

// Menos de 500 calorías, mostrando solo nombre y calorías (proyección)
db.platos.find({ calorias: { $lt: 500 } }, { nombre: 1, calorias: 1, _id: 0 });

// Aptos para celíacos Y diabéticos (operador lógico $and)
db.platos.find({ $and: [{ aptoCeliacos: true }, { aptoDiabeticos: true }] }, { nombre: 1, _id: 0 });

// Precio entre 8000 y 12000
db.platos.find({ precio: { $gte: 8000, $lte: 12000 } }, { nombre: 1, precio: 1, _id: 0 });

// ===== MODIFICACIONES =====
// updateOne: cambia el precio y registra la fecha de modificación
db.platos.updateOne(
  { nombre: "Ensalada César" },
  {
    $set: { precio: 9800 },
    $currentDate: { ultimaModificacion: true }
  }
);

// updateOne con $push: agrega un ingrediente al array
db.platos.updateOne(
  { nombre: "Provoleta a la parrilla" },
  { $push: { ingredientes: "tomates secos" } }
);

// updateMany: aumenta 10% el precio de los platos veganos, redondeando
// (se redondea para evitar decimales por error de punto flotante)
db.platos.updateMany(
  { aptoVeganos: true },
  [ { $set: { precio: { $round: [{ $multiply: ["$precio", 1.1] }, 0] } } } ]
);

// ===== BAJAS =====
// Plato temporal para probar deleteOne
db.platos.insertOne({ nombre: "Plato de prueba", descripcion: "Para probar bajas", ingredientes: ["ninguno"], precio: 1, aptoCeliacos: false, aptoVeganos: false, aptoDiabeticos: false, calorias: 0, imagen: "https://placehold.co/600x400?text=Prueba" });

// deleteOne: borra el primer documento que coincide con el filtro
db.platos.deleteOne({ nombre: "Plato de prueba" });

// Dos platos temporales muy calóricos para probar deleteMany
db.platos.insertMany([
  { nombre: "Parrillada completa", descripcion: "Para probar bajas", ingredientes: ["achuras", "vacío", "chorizo"], precio: 30000, aptoCeliacos: true, aptoVeganos: false, aptoDiabeticos: false, calorias: 1800, imagen: "https://placehold.co/600x400?text=Parrillada" },
  { nombre: "Pizza grande de muzzarella", descripcion: "Para probar bajas", ingredientes: ["harina", "muzzarella", "salsa de tomate"], precio: 15000, aptoCeliacos: false, aptoVeganos: false, aptoDiabeticos: false, calorias: 1600, imagen: "https://placehold.co/600x400?text=Pizza" }
]);

// deleteMany: borra todos los platos de más de 1500 calorías
db.platos.deleteMany({ calorias: { $gt: 1500 } });

// Comprobación final: tiene que volver a dar 10
db.platos.countDocuments();
