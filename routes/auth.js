var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');

module.exports = function(passport){
  router.get('/login', function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if(fmsg.error){
      feedback = fmsg.error[0];
    }
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
    <div style="color:red;">${feedback}</div>
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
    `, '');
    response.send(html);
  });
  
   // 사용자가 로그인을 전송했을 때 패스포트가 그 데이터를 처리하기 위한 코드
   router.post('/login_process',
   passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/auth/login',
     failureFlash:true,
     successFlash: true
   }));
    // 사용자가 로그인을 전송했을 때 패스포트가 그 데이터를 처리하기 위한 코드
  
  router.get('/logout', function (request, response) {
    request.logout();
    request.session.save(function () {
      response.redirect('/');
      });
      });
  
  router.get('/logout', function(request,repsonse){
    request.logout();
    request.session.save(function(err){
      response.redirect('/');    
    })
  });
  return router;
}