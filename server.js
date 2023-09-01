const express = require("express");
const routes = require("./routes");
const db = require("./config/connections");



const Port = process.env.PORT|| 3001;

const app = express ()


app.use (express.urlencoded({extended:true}))

app.use (express.json())

app.use (routes)
db.once("open", () => {
app.listen (Port, ()=> {
    console.log("app listening!")
})
});