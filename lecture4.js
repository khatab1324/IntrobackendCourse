const express = require("express")
const mysql = require("mysql2")
const { urlencoded } = require("body-parser")
const app = express()
const dotenv = require("dotenv")
dotenv.config();
app.use(urlencoded({ extended: true }))

const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    database: process.env.DATABASE
}).promise()

app.get("/users", async (req, res) => {
    try {
        const data = await pool.execute("select * from users")
        console.log(data[0]);
        if (data[0].length === 0) return res.status(404).send({ message: "users not found" })
        res.status(200).send(data[0])
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

// get specific user
app.get("/users/:id", async (req, res) => {
    try {
        const paramsId = req.params.id;
        const data = await pool.execute("select * from users where id = ?", [paramsId])
        if (data[0].length === 0) return res.status(404).send({ error: { message: "user is not found" } })
        res.status(200).send(data[0]);
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }

})

//create user
app.post("/users", async (req, res) => {
    try {
        const { id, username, age, mark } = req.body
        if (!id || !username || !age || !mark) res.status(400).send({ message: "you should pass all the data (age,username,mark,id)" })
        await pool.execute("insert into users (id,username,mark,age) values (?,?,?,?)", [id, username, mark, age])
        res.status(201).send("user is created ")
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }

})

//edit on user

app.put("/users", async (req, res) => {
    try {
        const { id, username, age, mark } = req.body
        if (!id || !username || !age || !mark) return res.status(400).send({ message: "you should pass all the data (age,username,mark,id)" })
        const sql = "UPDATE users SET username= ?, mark= ?, age= ? WHERE id = ?"
        const result = await pool.execute(sql, [username, mark, age, id])
        if (result[0].affectedRows === 0) return res.status(404).send({ message: "user id is not found" })
        res.status(200).send({ message: "user is updated" })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

//delete user
app.delete("/users/:id", async (req, res) => {
    try {
        const sql = "delete from users where id =?"
        const result = await pool.execute(sql, [req.params.id])
        if (result[0].affectedRows === 0) return res.status(404).send({ message: "user id is not found" })
        res.status(200).send("user is deleted")
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})


const port = 3000
app.listen(port, () => {
    console.log("running on port number : " + port);
})