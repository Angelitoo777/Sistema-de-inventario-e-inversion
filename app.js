import express from "express"
import dotenv from "dotenv"
import { sequelize } from "./utils/mysql.database.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())

try {
    await sequelize.authenticate()
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