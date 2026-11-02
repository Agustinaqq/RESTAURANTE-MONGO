// ===== CREACIÓN =====
// En un archivo no funciona "use restaurante" (es un atajo de la consola),
// por eso se selecciona la base con getSiblingDB
db = db.getSiblingDB("restaurante");

db.createCollection("platos");

// ===== ALTAS =====

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
})

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
])