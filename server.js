// necessities --> requirements
var express         = require('express'),
    mongoose        = require('mongoose'),
    bodyParser     = require('body-parser'),
    methodOverride  = require('method-override'),
    passport        = require('passport'),
    session         = require('express-session'),
    app             = express(),
    http            = require('http').Server(app),
    io              = require('socket.io')(http),
    routesController  = require('./controller/routes.js'),
    convertController = require('./controller/convert.js'),
    User            = require('./models/user.js'),
    Board           = require('./models/board.js'),
    port            = process.env.PORT || 3000,
    mongoUri        = process.env.MONGOLAB_URI || 'mongodb://localhost/comm-board-dp';


// Public folder Styles/JS
app.use(express.static('public'));
// ==================================================
// passport essentials
app.use(session({secret: 'oijansoidubniausdbias'}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);
// ==================================================

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// makes a variable login available in your templates.
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});


// using mongoose
// mongoose.connect('mongodb://localhost/community_board');
mongoose.connect(mongoUri);

// route for the users after the visiting the profile page
app.use('/',routesController);

// app.use('/convert', convertController);

// requiring socket
require('./controller/socket.js')(http);

// connecting to the server..listening for request & response
http.listen(port,function(){
  // http.listen(port,function(){
  //   console.log('http is on');
  // });
  console.log('==========================');
  console.log('Running on port = '+port);
  console.log('==========================');
  console.log(' ');
});
