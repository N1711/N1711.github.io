const express = require('express');
const home = require('./routes/home');
const userLogin = require('./routes/login');
const profile = require('./routes/profile');
const dbentry = require('./routes/dbentry');
const dashboard = require('./routes/dashboard')
const unknown = require('./routes/page404.js')
const bodyParser = require('body-parser');
const session = require('express-session');
const adminRoute = require('./routes/adminRoute');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//middleware to check if the user is auhenticated
const checkAuth = (req, res, next) => {
    if (!req.session.isLogged) {
      res.redirect('/login');
    } else {
      next();
    }
  }

  const checkAdminAuth = (req, res, next) => {
    if(!req.session.isLogged || (req.session.isLogged && req.session.UL != 2)) {
      res.redirect('/');
    }
     else {
       next();
     }
  }

app.set('view engine', 'ejs');

//configure session
app.use(session({
    key: 'user_sid',
    secret: 'medina+stoyan',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));

app.listen(port, () => console.log('Listening...'));

app.use(userLogin);
app.use(checkAuth, profile);
app.use(checkAuth, dashboard);
app.use(checkAuth, dbentry);
app.use(checkAuth, home);
app.use(checkAdminAuth, adminRoute);
app.get('/signOut', (req,res,next) => {
    if(req.session) {
        req.session.destroy(err => err ? next(err) : res.redirect('/'));    
    }
})
app.use('/', checkAuth, unknown);