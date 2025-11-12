import { Users } from './users.model.js'
import { Clients } from './clients.model.js'
import { Sales } from './sales.model.js'
import { detailsSales } from './detailsSales.model.js'
import { Buys } from './buys.model.js'
import { Inventory } from './inventory.model.js'
import { Products } from './products.model.js'

// Un Usuario (User) tiene muchos Clientes (Clients)
Users.hasMany(Clients, {
  foreignKey: 'userId', // Añadirá userId a Clients
  as: 'clients'
})
Clients.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user'
})

// Un Usuario (User) tiene muchas Compras (Buys)
Users.hasMany(Buys, {
  foreignKey: 'userId', // Añadirá userId a Buys
  as: 'buys'
})
Buys.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user'
})

// Un Usuario (User) tiene muchos items de Inventario (Inventory)
Users.hasMany(Inventory, {
  foreignKey: 'userId', // Añadirá userId a Inventory
  as: 'inventoryItems' // Usamos 'inventoryItems' porque 'inventory' es el modelo
})
Inventory.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user'
})

// Un Usuario (User) registra muchas Ventas (Sales)
Users.hasMany(Sales, {
  foreignKey: 'userId', // Añadirá userId a Sales
  as: 'salesRegistered' // Quién registró la venta
})
Sales.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user'
})

// Un Usuario (User) tiene muchos Productos (el Catálogo)
Users.hasMany(Products, {
  foreignKey: 'userId', // Añadirá userId a Products
  as: 'products'
})
Products.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user'
})

// --- RELACIONES DE NEGOCIO (FLUJO DE VENTA) ---

// Un Cliente (Client) puede tener muchas Ventas (Sales)
Clients.hasMany(Sales, {
  foreignKey: 'clientId', // Añadirá clientId a Sales
  as: 'sales'
})
Sales.belongsTo(Clients, {
  // ¡PISTA CLAVE! Hacemos la FK opcional (allowNull)
  // para permitir ventas de contado (sin cliente).
  foreignKey: {
    name: 'clientId',
    allowNull: true
  },
  as: 'client'
})

// Una Venta (Sales) tiene muchos Detalles (detailsSales)
Sales.hasMany(detailsSales, {
  // ¡PISTA CLAVE! Hacemos la FK obligatoria.
  // Un detalle no puede existir sin una venta.
  foreignKey: {
    name: 'saleId',
    allowNull: false
  },
  as: 'details' // Una venta tiene "details"
})
detailsSales.belongsTo(Sales, {
  foreignJoin: 'saleId',
  as: 'sale' // Un detalle pertenece a una "sale"
})

// 3. Exportar todos los modelos (ya asociados)
export {
  Users,
  Clients,
  Sales,
  detailsSales,
  Buys,
  Inventory,
  Products
}
