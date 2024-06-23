// imported node modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// In-app imports
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
// require('dotenv').config();

// Server initialization
const app = express();
const PORT = process.env.DB_URL || 3001;

// Session configuration
const sess = {
    secret: "salsa",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Handlebars initialization
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(routes);

// Static page
app.use(express.static(path.join(__dirname, 'public')));

// Servier listener
sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});