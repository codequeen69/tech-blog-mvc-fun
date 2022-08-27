const path = require ('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

//import the connection from sequelize
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const PORT = process.env.PORT || 3001;

const sess ={
    secret:'Super secret secret',
    cookie: {},
    resave:false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//will import routes from index.js
const routes = require('./controllers');

//turns on the routes
app.use(routes);


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//for handlebars find out what these are doing!
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//turns on connection to db, connects models to associated db tables, will create a table if none is found
//if force is set to true it will drop and recreate db and tables;
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log('Now listening!'));
});