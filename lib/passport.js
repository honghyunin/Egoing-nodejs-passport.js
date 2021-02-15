module.exports = function(app){
    var authData = {
        email: 'hyunin0102@gmail.com',
        password: '0102',
        nickname: 'hyunin'
      }
      
        var passport = require('passport'),
            LocalStrategy = require('passport-local').Strategy;
      
        
      // 패스포트와 내부적으로 처리하기 위한 세션을 설치하는 코드
      app.use(passport.initialize());
      app.use(passport.session());
      // 패스포트와 내부적으로 처리하기 위한 세션을 설치하는 코드
      
      
      passport.serializeUser(function(user, done) {
        done(null, user.email);
      });
      // 시리얼라이즈는 딱 한 번 호출되면서 로그인에 성공했다는 사실을 세션 스토어에 저장하는 기능을 하는 것이 serializeUser
      
      passport.deserializeUser(function(id, done) {
         done(null, authData);
      });
      // 저장된 데이터를 기준으로 해서 우리가 필요한 정보를 조회할 때 사용하는 것이 디시리얼라이저
      
      
      // 사용자가 로그인을 전송했을 때 그게 맞는 지 틀린지 검사하는 코드
        passport.use(new LocalStrategy(
          {
            usernameField:'email',
            passwordField: 'pwd'
          },
          function(username, password, done) {
            console.log('LocalStrategy', username, password);
            if(username === authData.email){
              if(password === authData.password){
                return done(null, authData, {
                  message:'Welcome.'
                });
              } else{
                return done(null, false, { message: 'Incorrect password.' });
              }
            } else {
              return done(null, false, { message: 'Incorrect username.' });
            }
         }
        ));
        // 사용자가 로그인을 전송했을 때 그게 맞는 지 틀린지 검사하는 코드
        return passport;
}
