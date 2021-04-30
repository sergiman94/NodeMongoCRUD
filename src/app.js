const express = require("express");
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const app = express();

// connect to db
mongoose.connect('mongodb://localhost/crud-mongo', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {console.log('Db connected')}).catch((err)=>{console.log(err)})

// import routes
const indexRoutes = require('./routes/index')

// settings
app.set('port', process.env.PORT || 3000)
// localizamos la carpeta donde va estar la vista
app.set('views', path.join(__dirname, 'views')) // __dirname ya posiciona la ubicacion de este archivo entonces solo es hacer un join con el modulo path
app.set('view engine', 'ejs')

// Middleware
// morgan permite processar las peticiones antes de que lleguen a las rutas
app.use(morgan('dev'))
// para entender los datos que envia el cliente desde un html se utiliza urlencoded
// extended : false se pone en false porque desde el html no se va a enviar archivos complejos (imagenes, zip, etc)
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/', indexRoutes)

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
