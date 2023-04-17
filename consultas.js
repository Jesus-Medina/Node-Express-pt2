const { Pool } = require("pg")

const credenciales = {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "likeme",
    port: "5432",
    allowExitOnIdle: true
}

const clienteDB = new Pool(credenciales)

const getDate = async () => {
    const resultado = await clienteDB.query("SELECT NOW()")
    console.log(resultado)
}

const verPosts = async () => {
    const consulta = "SELECT * FROM posts"
    const respuesta = await clienteDB.query(consulta)
    return respuesta
}

const crearPost = async (titulo, url, descripcion, likes = 0) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)"
    const values = [titulo, url, descripcion, likes]
    const respuesta = await clienteDB.query(consulta, values)
    return respuesta
}

const modificarPost = async(id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const values = [id] 
    await clienteDB.query(consulta, values)
}

const eliminarPost = async(id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id] 
    await clienteDB.query(consulta, values)
}

module.exports = { getDate, verPosts, crearPost, modificarPost, eliminarPost }