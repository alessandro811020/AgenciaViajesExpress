const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const PORT = 3000;

const app= express();

//establece donde estan las vistas en que carpeta
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs({defaultLayout:'main'}));
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT||PORT));

app.get('/',(req,res)=>{
    res.render('home',{
        title:"Agencia de Viajes de GEEKSHUBS"
    });
})


app.listen(app.get('port'),()=>{
    console.log(`Inicializado el servidor de http://localhost:${app.get('port')}`);
    
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