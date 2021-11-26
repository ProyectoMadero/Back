const express = require('express');
const config = require('./config')
const cors = require('cors');
const app = express();

//Componentes
const admin = require('./components/admin/network');
const guest = require('./components/guest/network');
const recepcionist = require('./components/recepcionist/network')
const someone = require('./components/someone/network');
const test = require('./components/test/network');

//Middlewares
const middleware = require('./middleware');

//Configuraciones
/* app.use(middleware.accessTokenAdmin); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Permite las peticiones y respuestas entre Back y Front
app.use(cors());

//Rutas
app.use('/admin', /* middleware.accessTokenAdmin, */ admin);
app.use('/guest', /* middleware.accessTokenGuest, */ guest);
app.use('/recepcionist', /* middleware.accessTokenRecepcionist, */ recepcionist);
app.use('/someone', someone);
app.use('/test', test);

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
    console.log('API listening on port', PORT);
});