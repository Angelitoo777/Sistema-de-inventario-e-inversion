import express from "express"
import dotenv from "dotenv"
import { sequelize } from "./utils/mysql.database.js"
import { routesOfUsers } from './routes/user.routes.js'
import { routesOfSale } from "./routes/sale.routes.js"
import { routesOfClient } from "./routes/client.routes.js"
import { routesOfProducts } from "./routes/products.routes.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cookieParser())
app.use('/auth', routesOfUsers)
app.use('/api', routesOfSale)
app.use('/api', routesOfClient)
app.use('/api', routesOfProducts)

try {
    await sequelize.sync({ force: true })
    console.log("Conexión a la base de datos establecida correctamente.")
} catch (error) {

}

app.get("/", (req, res) => {
    res.send("Hola Mundo")
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})