const routes = require('./controllers');
const helpers = require('./utils/helpers');
const authGuard = require('./utils/authGuard');
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const app = express();
// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as the default engine with custom helpers
const hbs = exphbs.create({ helpers, partialsDir: path.join(__dirname, 'views/partials') });

// Sets up session and connect to our Sequelize db
// Configure and link a session object with the sequelize store
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,  // Session expires after 300 seconds
        httpOnly: true,
        secure: false,  // Set to true if using https
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply authGuard middleware to protected routes
app.use('/profile', authGuard);

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Static middleware pointing to the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the routes to the server
app.use(routes);

// Start the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
