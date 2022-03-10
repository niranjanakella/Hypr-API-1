var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var cors = require('cors')
var logger = require('morgan');
var permittedCrossDomainPolicies = require('helmet-crossdomain');
const fileUpload = require('express-fileupload');
var accountRouter = require('./routes/accountRoutes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/productRoutes')
var orderProcessRouter = require('./routes/orderProcessRoutes')
var socialRouter = require('./routes/socialRoutes/socialPost.routes')
var groupRouter = require('./routes/socialRoutes/group.routes')
var payPal = require('./routes/payPal')
require('./shared/variables')
// const catTypeSchema = require('./model/catTypeModel')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

// // app.use(express.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.set('trust proxy', 1) // trust first proxy


app.use(session({
  secret: 'your-secret-key',
  expires: new Date(Date.now() + 3600000),
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({

    url: process.env.DB_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native'
  })

}));
app.use(cors())
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
 
  // Pass to next layer of middleware
  next();
});

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(fileUpload());
// app.use(helmet());
// app.use(helmet.noCache());
// app.use(helmet.frameguard());
app.use(permittedCrossDomainPolicies())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', productRouter);
app.use('/', orderProcessRouter)
app.use('/', payPal)
app.use('/user', accountRouter)
app.use('/users', usersRouter);
app.use('/social', socialRouter);
app.use('/social/group', groupRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 9002;
app.listen(port, () => {
  console.log('Server running at ' + port)
});


module.exports = app;
