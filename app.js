const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const indexRouter = require('./routes/index');

const PORT = 3000;

const app= express();

//establece donde estan las vistas en que carpeta
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:'pimpinela', saveUninitialized:false,resave:false}));
app.engine('hbs', hbs({defaultLayout:'main'}));
app.set('view engine', 'hbs');

app.use('/', indexRouter);

app.set('port', (process.env.PORT||PORT));

app.listen(app.get('port'),()=>{
    console.log(`Inicializado el servidor de http://localhost:${app.get('port')}/home`);
    
})

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

  module.exports = app;