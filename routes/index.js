var router = require('koa-router')();

	router.get('/',function *(){
		console.log(this.query);
		yield this.render('index',{layout:false});
	})
