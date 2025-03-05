// const { urlencoded } = require("body-parser");
// const express = require("express");
// const app = express();

// app.use(urlencoded({ extended: true }))

// let arr = [{ id: "1", username: "khattab", age: "20" },
// { id: "2", username: "rami", age: "20" },
// { id: "3", username: "omer", age: "20" }]


// app.get("/users", (req, res) => {
//     res.send(arr)
// })
// app.get("/users/:id", (req, res) => {
//     for (let i = 0; i < arr.length; i++) {
//         if (req.params.id === arr[i].id) {
//             res.jsone(arr[i])
//         }
//     }
//     res.send("user not found")
// })

// app.post("/users", (req, res) => {
//     console.log(req.body);
//     arr.push(req.body);
//     res.send("create user")
// })
// app.put("/users", (req, res) => {
//     const id = req.body.id;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].id === id) {
//             arr[i] = req.body
//             res.send("user is updated")
//         }
//     }
//     res.send("user not found")
// })
// app.delete("/users/:id", (req, res) => {
//     const id = req.params.id;
//     let newArr;
//     for (let i = 0; i < arr.length; i++) {
//         newArr = arr.filter((item) => item.id !== id)
//         arr = newArr;
//     }
//     res.send(newArr)
// })

// app.set("view engine", "ejs")

// app.get("/", (req, res) => {
//     res.render("home", { username: "abdallah" })
// })

// app.get("/", async (req, res) => {
//     const response = await fetch("https://swapi.dev/api/planets/")
//     const data = await response.json()
//     console.log(data);
//     res.send(data.results)
// })

// app.get("/:planetName", async (req, res) => {
//     const planetName = req.params.planetName;
//     const response = await fetch(`https://swapi.dev/api/planets/?search=${planetName}`)
//     const data = await response.json();

    // let name = data.results[0].name
    // let gravity = data.results[0].gravity
    // let climate = data.results[0].climate
    // let population = data.results[0].population

    // const ourData = { name, gravity, climate, population }

    // ourData.name = data.results[0].name
    // ourData.gravity = data.results[0].gravity
    // ourData.climate = data.results[0].climate
    // ourData.population = data.results[0].population





    // const ourData = {
    //     name: data.results[0].name,
    //     gravity: data.results[0].gravity,
    //     climate: data.results[0].climate,
    //     population: data.results[0].population
    // }

//     res.json(ourData)
// })

// const mysql = require("mysql2");
// const pool = mysql.createPool({
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     database: "intro_to_backend"
// }).promise();

// app.get("/users", async (req, res) => {
//     const data = await pool.execute("select * from users");
//     console.log(data[0]);
//     res.send(data[0])
// })


// app.listen(3000, () => {
//     console.log("listening on port number 3000");

// })