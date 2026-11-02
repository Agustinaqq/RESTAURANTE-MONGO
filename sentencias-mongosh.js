// ===== CREACIÓN =====
// En un archivo no funciona "use restaurante" (es un atajo de la consola),
// por eso se selecciona la base con getSiblingDB
db = db.getSiblingDB("restaurante");

db.createCollection("platos");