const functions = require('firebase-functions')
const express = require('express');
const app = express()
const cors = require('cors');
const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");
const bodyParser = require('body-parser');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-authentication-41ddd.firebaseio.com"
});
const db = admin.firestore();
const mySql = require('mysql');
const { user } = require('firebase-functions/lib/providers/auth');
app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


var sqlDb = mySql.createConnection({
  host: 'serverlessproject.cjxgcvbhqtfz.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'serverless',
  port: '3306', database: 'serverless'
});

sqlDb.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('MySql Connected');
});


app.get('/', (_req418, res418) => {
  try {
    res418.send('Job Application started');
  }
  catch (error) {
    return res418.status(404).send('error occurred during initial setup');
  }
});


app.get('/securityquestions', async (req, res, next) => {
  try {
    const securityquestionsSnapshot = await db.collection('usersecurityqa').get();
    const securityqa = [];
    securityquestionsSnapshot.forEach((doc) => {
      securityqa.push({
        id: doc.id,
        data: doc.data()
      });
    });
    res.json(securityqa);
  } catch (e) {
    next(e);
  }
});

app.post('/securityquestions/add', async (req, res, next) => {
  try {
    if (req.body) {
      let userCredentialsSql = 'Insert into usercredentials values(?,?)';
      let userDetailssql = 'Insert into userdetails values(?,?,?,?,?)';
      email = req.body.email
      question1 = req.body.question1
      answer1 = req.body.answer1
      question2 = req.body.question2
      answer2 = req.body.answer2
      question3 = req.body.question3
      answer3 = req.body.answer3
      password = req.body.password
      firstname = req.body.firstname
      lastname = req.body.lastname
      userStatus = req.body.role
      if (email && password) {
        let userCredentialValues = [email, password]
        sqlDb.query(userCredentialsSql, userCredentialValues, (err, credentialresults) => {
          if (err) {
            return res.status(404).send('error occurred while inserting record in the database');
          }
        });
      }
      if (firstname && lastname && email && userStatus) {
        let userDetailsValues = [firstname, lastname, email,userStatus, "online"]
        sqlDb.query(userDetailssql, userDetailsValues, (err, detailresults) => {
          if (err) {
            return res.status(404).send('error occurred while inserting record in the database');
          }
        });
      }
      await db.collection('usersecurityqa').add({ email, question1, answer1 })
      await db.collection('usersecurityqa').add({ email, question2, answer2 })
      await db.collection('usersecurityqa').add({ email, question3, answer3 })
    }
    res.status(200).send('values inserted successfully')

  } catch (e) {
    next(e);
  }
});

port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.get('*', (_req, res) => {
  res418.send('Invalid url, please enter valid url path');
});

exports.signup = functions.https.onRequest(app)

