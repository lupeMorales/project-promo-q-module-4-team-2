const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const database = require('better-sqlite3');



const db = new database('src/database.db', {verbose: console.log});
const server = express();

server.set('view engine', 'ejs')
server.use(cors());
server.use(express.json({limit: '10mb'}));


const serverPort = process.env.PORT || 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


const savedCard = [];

//Primer endpoint crear tarjeta
server.post('/card', (req, res) => {


  if(req.body.name ==="" || req.body.job==="" || req.body.email ==="" || req.body.linkedin==="" || req.body.github==="" || req.body.photo ===""){

    const responseError = {
      success: false,
      error: "Falta un parámetro"
    }
    res.json(responseError)
  }else{

    const newCard = {
      ...req.body,
      id:uuidv4()
    }

    const query = db.prepare('INSERT INTO card ( id, name, job, palette, email, phone, linkedin, github, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

    query.run(newCard.id, newCard.name, newCard.job, newCard.palette, newCard.email, newCard.phone, newCard.linkedin, newCard.github, newCard.photo);

    console.log(newCard)
    // savedCard.push(newCard)
    const responseSuccess = {

      success: true,
      cardURL: `https://las-faraonas-awesome-card.herokuapp.com/card/${newCard.id}`
    }
    res.json(responseSuccess)
  } 
});

//*Segundo endpoint devolver tarjeta
server.get('/card/id', (req, res) => {
  res.json({
    url: `https://las-faraonas-awesome-card.herokuapp.com/card/${savedCard.id}`
  })
});


 server.get('/card/:id', (req, res) => {
  console.log(req.params.id);
  const query = db.prepare('SELECT * FROM card WHERE id= ?');
  const cardId = query.get(req.params.id)
 
   res.render('templateCard', cardId);
 })

//servidor de estático
const staticServer = './src/build';
server.use(express.static(staticServer));

//servidor de estático de estilos
const staticStylesServer = 'src/build/static/public-css';
server.use(express.static(staticStylesServer))
