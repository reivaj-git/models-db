import express from "express";
import cors from "cors";
import db from "./utils/database.js";
import User from "./models/users.model.js";
import "dotenv/config";

User;
//variable de entorno llamada port
const PORT = process.env.PORT ?? 8000;
// probar conexion con la base de datos

db.authenticate()
  .then(() => {
    console.log("Conexion correcta");
  })
  .catch((error) => {
    console.log(error);
  });
  
// { alter: true }
db.sync()
  .then(() => console.log("Base de dato sincronizada"))
  .catch((error) => console.log(error));

const app = express();

// const whitelist = ['http://localhost:8000', 'http://localhost:5173']
// const corsOption = { 
//   origin: (origin, cb) => {
//     if (!whitelist.includes(origin)) {
//      return cb(new error('not allowed'))//error first
//     }
//     cb(null, true);
//   }
// }
app.use(express.json());
app.use(cors());

// health check
app.get("/", (req, res) => {
  res.send("ok");
});

// CREATE user
// Cuando se haga una request a /users POSR crear un Usuario
app.post("/users", async (req, res) => {
  try {
    const { body } = req;
    // mandar esta info a la base de datos
    // * insert into users (username, email, password)
    const user = await User.create(body);
    res
      .header("Access-Control-Allow-Origin", "http://localhost:5173")
      .status(201)
      .json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});
// READ users 
//get /users - devolver un json con todos los usuaruios en la base de datos
//select * from users;
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//select * from users where id = 4
//get /users/:id 

app.get('/users/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const user = await User.findByPk(id);
    res.json(user)
  } catch(error){
    res.status(400).json(error);
  }
})

// UPDATE NAMETABLE WHERE id = No;
// PUT '/user' - path params
// la informacion a actualizar por el body

app.put('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {body} = req;
    //primer objeto es la info
    // segundo objeto es el where
    const user = await User.update(body, {
      where: {id} 
      //shorthand id = id
    })
    res.json(user)
  } catch (error) {
     res.status(400).json(error);
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await User.destroy({
      where: {id}
    })
    res.status(204).end();
  } catch (error) {
     res.status(400).json(error);

    
  }
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


