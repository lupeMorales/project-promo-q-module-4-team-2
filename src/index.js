const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')


const server = express();


server.use(cors());
server.use(express.json({limit: '10mb'}));


const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


const savedCard = [];
// // Escribimos los endpoints que queramos
// server.get('/users', (req, res) => {
//   const response = {
//     users: [{name: 'Sofía'}, {name: 'María'}],
//   };
//   res.json(response);
// });

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
    
    savedCard.push(newCard)
    const responseSuccess = {
      success: true,
      cardURL: `http://localhost:4000/card/${newCard.id}`
    }
    res.json(responseSuccess)
  }
  
  
  
})

//*Segundo endpoint devolver tarjeta
server.get('/card/id', (req, res) => {
  res.json({
    url: `http://localhost:4000/card/${savedCard.id}`
  })
});

//servidor de estático
const staticServer = './src/build';
server.use(express.static(staticServer));







