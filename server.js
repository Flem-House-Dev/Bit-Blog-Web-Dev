// imported node modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const addUserToLocals = require("./utils/user");

// In-app imports
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

// Server initialization
const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
    secret: "salsa",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 5 * 60 * 1000,
    }),
};

app.use(session(sess));

// Handlebars initialization
const hbs = engine({
    helpers: helpers,
});
app.engine("handlebars", hbs);
app.set("view engine", "handlebars");

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(addUserToLocals);
app.use(routes);

// Servier listener
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});
