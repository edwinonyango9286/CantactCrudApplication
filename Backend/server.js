
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();



const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));




app.post("/",(req,res)=>{
    const {name,email,contact}= req.body;
    const sqlInsert = "INSERT INTO  `contact`(`name`,`email`,`contact`) VALUES(?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
      if(error){
        console.log(error)
      }
    })
})


app.get('/', (req, res) => {
    const query = 'SELECT * FROM contact';
  
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });

  app.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM `contact` WHERE `id` = ?";
    db.query(sqlDelete, id, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete contact" });
      } else {
        res.status(200).json({ message: "Contact deleted successfully" });
      }
    });
  });

  app.get('/:id', (req, res) => {
    const id = req.params.id;
    const sqlGet = 'SELECT * FROM contact WHERE id=?';
  
    db.query(sqlGet, [id], (err, result) => { 
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
  
  app.put('/:id', (req, res) => {
    const id = req.params.id;
    const{name,email,contact}=req.body;
    const sqlUpdate = 'UPDATE  `contact` set name=?,email=?,contact=? WHERE id=?'; 
   
    db.query(sqlUpdate,[name,email,contact,id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });





app.listen(5000,()=>{
    console.log("Listening")
})



