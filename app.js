/**
 * New node file
 */
//resources

var koa = require('koa');
var app = koa();

var logger = require('koa-logger')
var router = require('koa-router');

var fs = require('fs');
var path = require('path');
var extname = path.extname;

var views = require('co-view');
var render = views('./views', {
    map: {
        html: 'jsx'
    }
});
var onerror = require('koa-onerror');
var staticServer = require('koa-static');
var render = require('koa-ejs');
//var model = require('./lib/model')

var myrouter = new router();

app.use(staticServer(path.join(__dirname, 'public')));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: '__layout',
    viewExt: 'html',
    cache: false,
    debug: true
});

myrouter.get('/:name', function * (next) {
    console.log(this.params.name);
    yield this.render(this.params.name, {layout: false});
}).get('/', function * (next) {
    yield this.render('index', {layout: false});
});

app.use(myrouter.routes());

/*app.use(function *(){
	//我是首页
    if(this.path==='/'){
    	yield this.render('index',{layout:false});
    }else if(this.path==='/about'){
    	yield this.render('about',{layout:false});
    }

})*/

//log
app.use(logger());

app.on('error', function(err, ctx) {
    console.log(err);
});

onerror(app);

/*app.use(route.get('/:name',function(name){
	this.body = "Halo"+name;
}));

app.use(function*(){
	this.body = "Halo Sora";
});*/

var server = app.listen(80, function() {
    console.log('Koa is listening to http://localhost:3000');
});
