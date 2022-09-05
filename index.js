const express = require('express');
const cors = require('cors');


const server = express();


server.use(cors());
server.use(express.json({limit: '25mb'}));


const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// // Escribimos los endpoints que queramos
// server.get('/users', (req, res) => {
//   const response = {
//     users: [{name: 'Sofía'}, {name: 'María'}],
//   };
//   res.json(response);
// });

//Primer endpoint crear tarjeta
server.post('/card', (req, res) => {
  const responseSuccess = {
    cardURL: "https://awesome-profile-cards.herokuapp.com/card/79021662372314686",
    success: true
  }
  const responseError = {
    success: false,
    error: "Falta un parámetro"
  }
  res.json(responseError)
})

//*Segundo endpoint devolver tarjeta
server.get('/card/id', (req, res) => {
  res.json({
    url: ""
  })
});










