// imported node modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const addUserToLocals = require('./utils/user');

// In-app imports
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
// require('dotenv').config();

// Server initialization
const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
    secret: "salsa",
    cookie: {},
    expiration: 5 * 60 * 1000,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Handlebars initialization
// const hbs = exphbs.create({ helpers });
const hbs = engine({
    helpers: helpers,
    // You can add more configuration options here if needed
  });
// app.engine('handlebars', hbs.engine);
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(addUserToLocals);
app.use(routes);


// Static page

// Servier listener
sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});