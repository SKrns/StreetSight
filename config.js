/*
 * 설정 파일
 *
 * @date 2016-11-10
 * @author Mike
 */

module.exports = {
	server_port: 52222,
	db_url: 'mongodb://163.44.165.68:27017/local',
	db_schemas: [
	    {file:'./user_schema', collection:'test01', schemaName:'UserSchema', modelName:'UserModel'}
			,{file:'./coffeeshop_schema', collection:'coffeeshop', schemaName:'CoffeeShopSchema', modelName:'CoffeeShopModel'}
	],
	route_info: [
		{file:'./coffeeshop', path:'/process/addcoffeeshop', method:'add', type:'post'}
 	    ,{file:'./coffeeshop', path:'/process/listcoffeeshop', method:'list', type:'post'}
 	    ,{file:'./coffeeshop', path:'/process/nearcoffeeshop', method:'findNear', type:'post'}
 	    ,{file:'./coffeeshop', path:'/process/withincoffeeshop', method:'findWithin', type:'post'}
 	    ,{file:'./coffeeshop', path:'/process/circlecoffeeshop', method:'findCircle', type:'post'}
 	    ,{file:'./coffeeshop', path:'/process/nearcoffeeshop2', method:'findNear2', type:'post'}
 	    ,{file:'./coffeeshop', path:'/process/withincoffeeshop2', method:'findWithin2', type:'post'}
 	],
 	facebook: {		// passport facebook
 		clientID: '1442860336022433',
 		clientSecret: '13a40d84eb35f9f071b8f09de10ee734',
 		callbackURL: 'http://localhost:3000/auth/facebook/callback'
 	},
 	twitter: {		// passport twitter
 		clientID: 'id',
 		clientSecret: 'secret',
 		callbackURL: '/auth/twitter/callback'
 	},
 	google: {		// passport google
 		clientID: 'id',
 		clientSecret: 'secret',
 		callbackURL: '/auth/google/callback'
 	}
 }
