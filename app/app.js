var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

const mongoURI = 'mongodb://localhost:27017/nombre-de-tu-base-de-datos'; // Reemplaza "nombre-de-tu-base-de-datos" con el nombre de tu base de datos
const port = 3000
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // Conectar a la base de datos MongoDB utilizando Mongoose
// Conectar a la base de datos MongoDB utilizando Mongoose
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
});

db.once('open', () => {
  console.log('Conexión exitosa a la base de datos MongoDB');
});
})

module.exports = app;
