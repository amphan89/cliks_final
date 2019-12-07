const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const methodOverride = require('method-override')
require('dotenv').config();


// set the view engine to ejs
app.set('view engine', 'ejs');

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 1 * 1000 * 60 * 60 * 24 * 365 } }));

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

//will send users' info (name, email and password) to this array
//we need to check and see how we also store the info in the db
const users = []

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

var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	user: "root",

	password: "password",
	database: "cliks_db"
});

connection.connect();

// app.get('/my_network', (req,res)=> {
// 	connection.query('SELECT * FROM users ', (error, results) => {
// 		if (error) throw error;

// 		res.json(results)
// 	})
// })

// /* -- Sessions / Authentication -- */
app.post('/login', function (req, res) {
	console.log(req.body)
	connection.query('SELECT * FROM users WHERE user_name = ? AND password = ?', [req.body.user_name, req.body.password], function (error, results, fields) {
		if (error) throw error;

		if (results.length == 0) {
			res.redirect('/index.html')
		} else {
			req.session.user_id = results.id;
			req.session.user_name = results.user_name;

			res.redirect('/my_network')
		}
	})
})

// routes
// app.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.html', {name: req.user.name})
// })

// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// })

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: 'login',
//     failureFlash: true
// }))

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
// })

// app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         })
//         res.redirect('/login')
//     } catch {
//         res.redirect('/register')
//     }
//     console.log(users)
// })
// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/login')
// }
// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     next()
// }


app.get('/my_network', function (req, res, next) {
	// res.json(req.session)
	// res.sendfile('public/my_network.html')
	connection.query('SELECT * FROM matches_table', function (error, results, fields) {
		if (error) {
			throw error;
		}else 
		console.log(results)
		res.render('pages/my_network', 
		{
			data: {
				user_name: req.session.user_name,
				user_id: results.user_id,
				matches: results.matches
			}}
			)
	})

})


/* -- User Set Up -- */
// app.get('/user-setup', function (req, res) {
// 	// if (req.query.user_name && req.query.email && req.query.password > 1){
// 	connection.query('INSERT INTO users (user_name, email, password) VALUES (?)', [req.query.user_name, req.query.email, req.query.password], function (error, results, fields) {
// 		if (error) res.send(error)
// 		else res.redirect('/');
// 	});
// 	// }else{
// 	// 	res.send('invalid name')
// 	// }
// });


/* -- Socket Chat -- */
app.get('/chat', function (req, res) {
	res.sendFile(__dirname + '/public/chat.html');
});

io.on('connection', function (socket) {
	socket.on('chat message', function (msg) {
		io.emit('chat message', msg);
	});
});

io.emit('some event', { for: 'everyone' });

app.listen(3000, function () {
	console.log('listening on *:3000');
});
