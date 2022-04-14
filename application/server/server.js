var nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport')

// server making of mysql
const fs = require("fs")
const express = require('express')
const app = express();
const mysql = require("mysql");
const cp = require("child_process");
const bodyParser = require("body-parser");// middleware used for giving the json object format
// const { urlencoded } = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt');
const { Connection } = require("puppeteer");
const { request } = require('http');
var session = require('express-session');


const db = mysql.createPool({    // we can also use createPool to make our application production grade.
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample_db',
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'snehal.mishra@pepcoding.com',
        pass: 'Snehal@2401'
    }
});


app.use(session({
    secret: 'secret',
    resave: true,
    saveUnintialized: true
}))


app.use(cors())

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))// middleware executed
// POST SOMETHING TO DATABSE for login
app.post('/', async (req, res) => {

    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);//using byrypt to get hashed password stored in database
    const age = req.body.age;
    db.getConnection(async (err, connection) => {


        if (err) throw (err)

        // whenever this is called we want to search in database.
        const sqlSearch = "SELECT*FROM sample_data WHERE email =?"
        const search_query = mysql.format(sqlSearch, [email]);
        // whenever this is called we want to insert something to database;
        const sqlInsert = "INSERT INTO sample_data(email,password,age) VALUES(?,?,?)"
        const insert_query = mysql.format(sqlInsert, [email, password, age])
        // db.query(sqlInsert, [email, password, age], (req, res) => {
        //     console.log(res)//to see if query works right
        // })
        // 

        // Now askking the connection for sql database search for the given email in login 
        await connection.query(search_query, async (err, result) => {

            if (err) throw (err)
            console.log("-------> Searching Results");
            console.log(result.length);

            if (result.length != 0) {
                connection.release()// if given result matches the details in datbase release connection  from database,
                console.log("-------> User already exists");

            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release();

                    if (err) throw (err)
                    console.log("--------> Created new User");


                })
            }

        })
    })

})

// LOGIN AUTHOTICATION USING bycrypt compare .

app.post('/userAuth', async (req, res) => {
    const email = req.body.email;
    // const password = awreq.body.password, 10)
    const password = req.body.password;


    db.getConnection(async (err, connection) => {
        if (err) throw (err);
        const sqlSearch = "SELECT*FROM sample_data WHERE email =?"
        const search_query = mysql.format(sqlSearch, [email]);  // searching for the userEmail and its password in database storage.

        await connection.query(search_query, async (err, result) => {
            connection.release();
            if (err) throw (err);

            if (result.length == 0) {
                console.log("--------> User Does Not Exists");
                res.redirect("http://localhost:3000/loginNew")

            } else {
                const hashedPassword = result[0].password // get hashed password from the result;

                if (await bcrypt.compare(password, hashedPassword)) {

                    
                    console.log('-------> Login Successful');
                    res.redirect('http://localhost:3000/dash')

                } else {
                    console.log("-------> Password Incorrect")
                    res.redirect("http://localhost:3000/loginNew")
                }
            }

        })


    })

})


// app.get('/userAuth', (req, res) => {
//     console.log("User Exist or PAssword Incorrect")
//     res.send("User Already Existing or Incorrect Password")
// })















app.get('/', (req, res) => {
    console.log('server running bro!')
    res.send('server running bro!')
})
// post something in the database from signup



// taking information from webscraping application and inserting it into the database.

app.post("/user", (req, res) => {
    const url  =req.body.url
    const email  =req.body.email
    console.log("server running for notifier")
    db.query("DELETE FROM vaccine")
    cp.execSync(`node  autmate.js${url} `);

    let vaccinedetails = fs.readFileSync('vaccine.json', "utf-8");

    vaccinedetails = JSON.parse(vaccinedetails);

    for (let i = 0; i < vaccinedetails.length; i++) {
        
        console.log(vaccinedetails[i])
        //  res.send(vaccinedetails[i])
        const dates = vaccinedetails[i].Dates;
        const Center = vaccinedetails[i].Center;
        const vaccineName = vaccinedetails[i].Vaccinename;
        const Dose1 = vaccinedetails[i].DOSE1;
        const Dose2 = vaccinedetails[i].DOSE2;
        const Total = vaccinedetails[i].TOTAL;
        const sqlInsert = "INSERT INTO vaccine (Date,Centre,vaccine_name,dose1,dose2,total) VALUES(?,?,?,?,?,?)"
        // fs.appendFileSync('vaccination.json', dates + center + dose1 + dose2 + total, 'utf-8');
        // const Date = req.body.Dates;
        // const Centre = req.body.Center;
        // const vaccine_name = req.body.vaccineName;
        // const dose1 = vaccine_details[i].DOSE1;
        // const dose2 = vaccine_details[i].DOSE2;
        // const total = vaccine_details[i].TOTAL;
        db.query(sqlInsert, [dates, Center, vaccineName, Dose1, Dose2, Total], (req, res) => {
            console.log(res)//to see if query works right
        })


    }
    var mailOptions = {
        from: 'do.no.replu@outlook.com',
        to: email,
        subject: 'CoWIN NOTIFIER',
        text: 'Vaccine Details in attachment given below',
        attachments: [
            {
                filename: 'Vaccination.xlsx',
                path: __dirname + '/Vaccination.xlsx'
            }
        ]
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Unable to send mail', err);
        } else {
            console.log('Email send successfully');
        }
    });

    res.redirect("http://localhost:3000/notifier")

})




// sending data or database stored backened data to frontend using GET

app.get('/loginget', function (req, res) {
    const sqlSelect = "SELECT *FROM sample_data";
    db.query(sqlSelect, (err, result) => {
        console.log(result)//to see if query works right
        // res.send(result)
    })

})
app.get('/users', function (req, res) {
    const sqlSelect = "SELECT * FROM vaccine";
    db.query(sqlSelect, (err, result) => {
        // console.log(result)//to see if query works right
        res.send(result)
    })

})

app.get('/signup', function (req, res) {
    const sqlSelect = "SELECT *FROM sample_data";
    db.query(sqlSelect, (err, result) => {
        console.log(result)//to see if query works right

        // sending data to frontEnd
        res.send(result)

    })

})


app.listen(5000, () => [

    console.log("server running on port 5000")
])