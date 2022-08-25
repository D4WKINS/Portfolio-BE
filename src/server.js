import express from "express"

import listEndPoints from "express-list-endpoints"

// import bodyParser from "body-parser"

import { engine } from "express-handlebars"

import path from "path"

import { fileURLToPath } from "url"

import emailRouter from "./services/email/index.js"

// import { NotFound } from "./errorhandler.js"

import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.port || 3001
const app = express()

const exphbs = engine
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cors())

app.use("/email", emailRouter)
// app.use("*", NotFound)

//Transporter is an object that allows us to send mail
// let transporter = nodemailer.createTransport(transport, [defaults])

// View engine setup

// app.engine("handlebars", exphbs())

// app.set("view engine", "handlebars")

// //Static folder
// app.use("/public", express.static(path.join(__dirname, "public")))

// // Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()) // parse application/json

// app.get("/", async (req, res) => {
//     res.render("contact", { layout: false })
// })

console.table(listEndPoints(app))
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
