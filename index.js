const express = require("express");
const app = express();
const port = 6400;
const path = require('path');
const userRoutes = require('./routes/userroutes');
const paymentRoutes = require('./routes/paymentroutes');
const adminRoutes = require('./routes/adminroutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const session = require('express-session')
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_URI,
    {
        serverSelectionTimeoutMS: 5000,
        
    }
).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});



// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
//set cross origin resource 
app.use(cors());
//host static files on my node server
app.use(express.static(path.join(__dirname, 'assets')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure session management
app.use(session({
    secret: 'hacked8_password', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({mongoUrl: process.env.CONNECTION_URI}),
    cookie: { secure: false } // Set to true if using HTTPS
  }));
  
  
// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);


app.get('/', (req, res)=>{
    res.render('index')
})
app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/contact', (req, res)=>{
    res.render('contact')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.get('/reset-password', (req, res) => {
    const { token } = req.query; // Extract the token from query parameters

    // Render the password reset page and pass the token to the view
    res.render("resetPassword", { token });
});

app.get('/register', (req, res)=>{
    res.render('register')
})
app.get('/adminlogin', (req, res)=>{
    res.render("adminlogin")
});
app.get('/reg2', (req, res)=>{
    res.render('referall')
})
app.get('/reset', (req, res)=>{
    res.render('forgot')
})
app.get('/service', (req, res)=>{
    res.render('service')
})

app.get('/dashboard', (req, res)=>{
    res.render('admin/html/dashboard')
})


app.get('/logout', (req, res)=>{
    req.session.destroy(err =>{
        if (err) {
            return res.status(500).json({status: "failed", message: err.message});
        }else{
            res.redirect('/login')
        }
    })
})
app.use((req, res, next) => {
    res.status(404).render('404');
  });

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})

module.exports = app;