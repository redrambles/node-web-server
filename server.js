const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Configure to use with heroku and local using 3000
const port = process.env.PORT || 3000; 

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next(); // continues with the rest of the program
});

// // Uncomment if you are updating the site
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         maintenanceMessage: 'Hang tight! Just doing a little house cleaning.'
//     });
//     // never calls next() = so program halts while this is running - serving maintenance.hbs no matter the url
// });

// app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express, you sexy thing!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Home Page! Stay for a while.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});