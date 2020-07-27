const functions = require('firebase-functions')
const express = require('express');
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt')
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

app.post('/userExists', (req, res, next) => {
  try {
    email = req.body.email
    if (email) {
      let checkIfUserRegistered = "select * from userdetails where email=?"
      values = [email]
      sqlDb.query(checkIfUserRegistered, values, (err, userPresent) => {
        if (err) {
          res.status(404).send('err')
        }
        if (Object.keys(userPresent).length > 0) {
          return res.status(200).send('User Already registered')
        }
        res.status(200).send('new user')
      })
    }
  }
  catch (e) {
    next(e);
  }
});

app.post('/userLogin', (req, res, next) => {
  try {
    email = req.body.email
    password = req.body.password
    if (email) {
      let auth = "select * from usercredentials where email=?"
      values = [email]
      sqlDb.query(auth, values, (err, results) => {
        if (err) {
          res.status(404).send(err)
        }
        if (Object.keys(results).length > 0) {
          bcrypt.compare(password, results[0].password, (error, passwordresults) => {
            if (passwordresults) {
              return res.status(200).send('User Verified')
            }
            else {
              return res.status(200).send('done')
            }

          })
        }
      })
    }
  }
  catch (e) {
    next(e);
  }
});

app.post('/securityquestions/add', (req, res, next) => {
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
      loginState = 'offline'

      if (email && password) {
        bcrypt.hash(password, 10, (err, hash) => {
          let userCredentialValues = [email, hash]
          sqlDb.query(userCredentialsSql, userCredentialValues, (err, credentialresults) => {
            if (err) {
              res.status(404).send('Something wrong with the registration');
            }
          });
        })
      }
      if (firstname && lastname && email && userStatus) {
        let userDetailsValues = [firstname, lastname, email, userStatus, loginState]
        sqlDb.query(userDetailssql, userDetailsValues, (error, detailresults) => {
          console.log(userDetailsValues)
          if (error) {
            res.status(404).send('Something wrong with the registration');
          }
          console.log(detailresults)
        });
      }
      db.collection('usersecurityqa').add({ email, question1, answer1, question2, answer2, question3, answer3 })
    }
    res.status(200).send('Registered successfully')

  } catch (e) {
    next(e);
  }
});

app.put('/logout', (req, res) => {
  values = [req.body.email]
  let sql = `Update userdetails set loginState ='offline' where email=?`
  sqlDb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(`value updated`);
  })
})

port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.get('*', (_req, res) => {
  res.send('Invalid url, please enter valid url path');
});

exports.signup = functions.https.onRequest(app)

