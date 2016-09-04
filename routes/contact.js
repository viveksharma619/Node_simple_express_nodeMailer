var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
// go to the contact us page

router.get('/', function(req, res, next){
  res.render('contact', { title :'Contact'});
});

//https://www.google.com/settings/security/lesssecureapps
router.post('/send', function(req , res, next){
  var transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
      user:'s.vivekblog@gmail.com',
      pass:'YOUR PASSWORD'
    },
    tls: {
        rejectUnauthorized: false
    }
  });
  var mailOptions ={
    from:'John Doe <johndoe@outlook.com>',
    to: 's.vivekblog@gmail.com',
    subject: 'Website Submission from NodeMailer',
    text:'You have a new submission with the following details.... Name:' + req.body.name +'Email :' + req.body.email + 'and message: ' + req.body.message,
    html:'<p>You have a new submission with the following details .. </p><ul><li>Name :' + req.body.name +'</li><li>Email:'+req.body.email+'</li><li> Message: ' + req.body.message + '</li></ul>'
  };
  
  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);
      res.redirect('/');
    }
    else{
      console.log('Message Sent '+ info.response );
      res.redirect('/');
    }
    
  });
});
module.exports = router;