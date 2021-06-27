const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root', 
    password:'',
    database:'pokemon'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api/get',(req,res)=>{

    const sqlSelect = "SELECT * FROM pokemon_owned"
    db.query(sqlSelect,(err,result)=>{
        res.send(result)
    })
})

app.put('/api/update',(req,res)=>{
    const pokemonID = req.body.pokemonID
    const pokemonNickName = req.body.pokemonNickName

    const sqlUpdate = "UPDATE pokemon_owned SET pokemonNickName = ? WHERE pokemonID = ?"
    db.query(sqlUpdate,[pokemonNickName,pokemonID],(err,result) => {
        console.log(pokemonNickName)
    }) 
})



app.delete('/api/delete/:pokemonID',(req,res)=>{

    const pokemonID = req.params.pokemonID
    const sqlDelete = "DELETE FROM pokemon_owned WHERE pokemonID = ?"
    db.query(sqlDelete,pokemonID,(err,result)=>{
        console.log(result) 
    })
})


app.post('/api/insert', (req,res)=>{

    const pokemonID = req.body.pokemonID
    const pokemonName = req.body.pokemonName
    const pokemonHeight = req.body.pokemonHeight
    const pokemonWeight = req.body.pokemonWeight
    const pokemonType = req.body.pokemonType
    const pokemonNickName = "" 


    const sqlInsert = "INSERT INTO pokemon_owned (pokemonID, pokemonName, pokemonNickName, pokemonHeight,pokemonWeight,pokemonType) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert,[pokemonID,pokemonName,pokemonNickName,pokemonHeight,pokemonWeight,pokemonType],(err,result)=>{
        console.log(result)
    })
})

app.listen(3001, () =>{
    console.log("server is running on 3001");
})