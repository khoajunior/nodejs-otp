import express from "express";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
const bodyParser = require("body-parser");


const app = express();

const firebaseConfig = {
   apiKey: "AIzaSyBxBO0_qAvYJ2U_PXFPoY10nPKTP2Pfctc",
   authDomain: "test-c4bf2.firebaseapp.com",
   databaseURL: "https://test-c4bf2.firebaseio.com",
   projectId: "test-c4bf2",
   storageBucket: "test-c4bf2.appspot.com",
   messagingSenderId: "459942945349",
   appId: "1:459942945349:web:100178c481463761e8b92c",
   measurementId: "G-VPFPWN1BN3"
};

firebase.initializeApp(firebaseConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


global.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
   'size': 'invisible',
   'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.

   }
});

app.get('/',(req,res)=>{
   res.send('we are home');
});
const appVerifier = global.recaptchaVerifier;
app.post('/',(req,res)=>{
   console.log(req.body.phone);
   res.send(req.body);
   firebase.auth().signInWithPhoneNumber(req.body.phone, appVerifier)
       .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
       }).catch(function (error) {
      // Error; SMS not sent
      // ...
   });
});

app.listen(3002);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
       "Access-Control-Allow-Headers",
       "Origin,X-Requested-With,Content-Type,Accept,Authorization"
   );
   if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST,PATCH,DELETE,GET");
      return res.status(200).json({});
   }
   next();
});


export default app;
