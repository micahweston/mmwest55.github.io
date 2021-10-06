const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');

const ExpressError = require('./utils/ExpressError');

const portfolioRoutes = require('./routes/portfolio');

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionConfig));
app.use(flash());

// Middleware for every single request we will have access to 'success' message on every route we pass.
app.use((req, res, next) => {
    console.log(req.session);
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', portfolioRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

// For all requests not found
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

// Error message
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error', { err });
});

// Port for express
app.listen(3000, () => {
    console.log('Serving on port 3000');
});