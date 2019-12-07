//required dependencies
const express = require ('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
// const mysql = require('mysql')
const dotenv = require("dotenv");
dotenv.config();
const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// var connection = mysql.createConnection({
// 	host: "localhost",

// 	// Your port; if not 3306
// 	port: 3306,

// 	user: "root",

// 	password: "password",
// 	database: "cliks_db"
// });

// connection.connect();

// will send users' info (name, email and password) to this array
// we need to check and see how we also store the info in the db
const users = []
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/cliks', { useNewUrlsParser: true })
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// mongoose.connect(config.DB,{ useMongoClient:true });
const db = mongoose.connection
db.on('error', (error) => console.log('Connected to Database'))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

//to enable use of dependencies
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUnitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//routes
// app.get('/my_profile', (req,res)=> {
// 	connection.query('SELECT * FROM users ', (error, results) => {
//         if (error) throw error;
        
//         for( let i=0; i < results.length; i++){
//             connection.query('SELECT * FROM academic_info WHERE user_id = ?', results[i].id, (err, info) => {
//                 if (err) throw err;
//                 // results[i].xyz = 0;
//                 // console.log(results[i])s
//                 const {profession, academic_degree, degree_field, academic_institution} = info[0];
//                 results[i].academic_info = [profession, academic_degree, degree_field, academic_institution]
//                 if (i === (results.length-1) ) {
//                     res.json(results)
//                 }
//                 console.log(info, i)
//             })
//         }
        
// 		// res.json(results)
// 	})
// })

// app.get('/my_network', (req,res)=> {
//     connection.query('', (error, results)=> {
//         if (error) throw error;
        
//     })

// })

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

//socket chat//

//middlewares
// app.use(express.static('public'))

//routes
app.get('/chat', (req, res) => {
    res.render('chat')
})

//Listen on port 3000
server = app.listen()

//socket.io installation
const io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username })
    })
})

app.listen(3000, () => console.log("server is running"))