const express = require("express")
const mysql = require("mysql2")
const { urlencoded, json } = require("body-parser")
const app = express()
const dotenv = require("dotenv")
const { PrismaClient } = require("@prisma/client")
dotenv.config();
app.use(urlencoded({ extended: true }))
app.use(json())

app.use(express.static("public"))
app.set("view engine", "ejs")

const prisma = new PrismaClient()

app.get("/", async (req, res) => {
    const data = await prisma.user.findMany()
    res.render("home", { data })
})

app.get("/users", async (req, res) => {
    try {
        const data = await prisma.user.findMany()
        if (data.length === 0) return res.status(404).send({ message: "users not found" })
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

// get specific user
app.get("/users/:id", async (req, res) => {
    try {
        const paramsId = req.params.id;
        const data = await prisma.user.findUnique({ where: { id: paramsId } })
        if (!data) return res.status(404).send({ error: { message: "user is not found" } })
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }

})

//create user
app.post("/users", async (req, res) => {
    try {
        const { username, age, mark, email } = req.body
        if (!username || !age || !mark) res.status(400).send({ message: "you should pass all the data (age,username,mark)" })
        await prisma.user.create({ data: { username, mark: Number(mark), age: Number(age), email } })
        res.status(201).send("user is created ")
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }

})

//edit on user

app.put("/users", async (req, res) => {
    try {
        const { id, username, age, mark, email } = req.body
        if (!id || !username || !age || !mark) return res.status(400).send({ message: "you should pass all the data (age,username,mark,id)" })
        const result = await prisma.user.update({ where: { id }, data: { username, mark: Number(mark), age: Number(age), email } })
        console.log(result);
        if (!result) return res.status(404).send({ message: "user id is not found" })
        res.status(200).send({ message: "user is updated" })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

//delete user
app.delete("/users/:id", async (req, res) => {
    try {
        const result = await prisma.user.delete({ where: { id: req.params.id } })
        if (!result) return res.status(404).send({ message: "user id is not found" })
        res.status(200).send("user is deleted")
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})


const port = 3000
app.listen(port, () => {
    console.log("running on port number : " + port);
})