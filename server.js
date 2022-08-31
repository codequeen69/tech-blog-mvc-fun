const path = require ('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});

//import the connection from sequelize
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const PORT = process.env.PORT || 3001;

const sess ={
    secret:'Super secret secret',
    cookie: {maxAge: 300000},
    resave:false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//for handlebars find out what these are doing!
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


//turns on the routes
app.use(require('./controllers'));

//turns on connection to db, connects models to associated db tables, will create a table if none is found
//if force is set to true it will drop and recreate db and tables;
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log('Now listening!'));
});
