const { verPosts, crearPost, modificarPost, eliminarPost } = require("./consultas.js")
const cors = require("cors")
const express = require("express")
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.listen(port, () => {
    console.log(`Server listen on port http://localhost:${port}`)
})

app.get("/", (req, res) => {
    try {
        res.sendFile(`${__dirname}/public/index.html`)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/posts", async (req, res) => {
    try {
        const { rows } = await verPosts()
        res.json(rows)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body 
        console.log(req.body)
        await crearPost(titulo, url, descripcion)
        res.send([])
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params 
        await modificarPost(id)
        res.send("Viaje modificado con exito!")
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        await eliminarPost(id)
        res.send("Viaje eliminado con exito!")
    } catch (error) {
        res.status(500).send(error)
    }
})


/* 
        RECORDATORIO

    - "req.params" es la informacion que viene de la URL  o path

    - "req.body" viene desde el html o body. Y requiere tener 
    express.json() como middleware

    - "req.query" es una consulta sql que se hace en la URL y 
    funciona de la siguiente forma: lo que viene despues del 
    signo "?"(seguido de "llave=valor") 
    ejemplo "/posts/1?titulo=nuevoTitulo"  

*/