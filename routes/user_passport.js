/**
 * 패스포트 라우팅 함수 정의
 *
 * @date 2016-11-10
 * @author Mike
 */

 var list = function(req, res) {
 	console.log('coffeeshop 모듈 안에 있는 list 호출됨.');

     // 데이터베이스 객체 참조
 	var database = req.app.get('database');

     // 데이터베이스 객체가 초기화된 경우
 	if (database.db) {
 		// 1. 모든 커피숍 검색
 		database.CoffeeShopModel.findAll(function(err, results) {
 			if (err) {
                 console.error('커피숍 리스트 조회 중 에러 발생 : ' + err.stack);

                 res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
 				res.write('<h2>커피숍 리스트 조회 중 에러 발생</h2>');
                 res.write('<p>' + err.stack + '</p>');
 				res.end();

                 return;
             }

 			if (results) {
 				console.dir(results);

 				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
 				res.write('<h2>커피숍 리스트</h2>');
 				res.write('<div><ul>');

 				for (var i = 0; i < results.length; i++) {
 					var curName = results[i]._doc.name;
 					var curAddress = results[i]._doc.address;
 					var curTel = results[i]._doc.tel;
 					var curLongitude = results[i]._doc.geometry.coordinates[0];
 					var curLatitude = results[i]._doc.geometry.coordinates[1];

 					res.write('    <li>#' + i + ' : ' + curName + ', ' + curAddress + ', ' + curTel + ', ' + curLongitude + ', ' + curLatitude + '</li>');
 				}

 				res.write('</ul></div>');
 				res.end();
 			} else {
 				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
 				res.write('<h2>커피숍 리스트 조회  실패</h2>');
 				res.end();
 			}
 		});
 	} else {
 		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
 		res.write('<h2>데이터베이스 연결 실패</h2>');
 		res.end();
 	}

 };

module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');

    // 홈 화면
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.render('login.ejs', {login_success:false});
        } else {
            console.log('사용자 인증된 상태임.');
            res.render('StreetSight_main.ejs', {login_success:true});
        }
    });

    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 요청됨.');
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    // 회원가입 화면
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    // 프로필 화면
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
        console.log('req.user 객체의 값');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('/profile 패스 요청됨.');
            console.dir(req.user);


            if (Array.isArray(req.user)) {
                res.render('profile.ejs', {user: req.user[0]._doc});
            } else {
                res.render('profile.ejs', {user: req.user});
            }
        }
    });

    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });


    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/main',
        failureRedirect : '/login',
        failureFlash : true
    }));

    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/main',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    router.route('/main').get(function(req, res) {
    	console.log('/main 패스 요청됨.');
    	res.render('StreetSight_main.ejs');
    });

    router.route('/maps').get(function(req, res) {
    	console.log('/maps 패스 요청됨.');
    	res.render('StreetSight_maps.ejs');

    });






    router.route('/introduce').get(function(req, res) {
    	console.log('/introduce 패스 요청됨.');

    	res.render('StreetSight_introduce.ejs');

    });

    router.route('/support').get(function(req, res) {
    	console.log('/support 패스 요청됨.');
    	res.render('StreetSight_support.ejs');
    });

    router.route('/achives').get(function(req, res) {
      res.render('StreetSight_achieves.ejs');

    });


};
