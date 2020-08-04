//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_db'
});

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res) => {
    let sql = "SELECT * FROM user";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.render('user_view',{
            results: results
        });
    });
});

//route for insert data
app.post('/save',(req, res) => {
    let data = {user_first_name: req.body.user_first_name,
                user_last_name: req.body.user_last_name,
                user_gender: req.body.user_gender,
                user_phone: req.body.user_phone,
                user_email: req.body.user_email,
                user_birth_date: req.body.user_birth_date,
                user_job: req.body.user_job};
    let sql = "INSERT INTO user SET ?";
    let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//route for update data
app.post('/update',(req, res) => {
    let sql = "UPDATE user SET user_first_name='"+req.body.user_first_name+"'," +
                            " user_last_name='"+req.body.user_last_name+"'," +
                            " user_gender='"+req.body.user_gender+"'," +
                            " user_phone='"+req.body.user_phone+"'," +
                            " user_email='"+req.body.user_email+"'," +
                            " user_birth_date='"+req.body.user_birth_date+"'," +
                            " user_job='"+req.body.user_job+"' WHERE user_id="+req.body.user_id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//route for delete data
app.post('/delete',(req, res) => {
    let sql = "DELETE FROM user WHERE user_id="+req.body.user_id+"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//server listening
app.listen(8000, () => {
    console.log('Server is running at port 8000');
});