module.exports = function(app){
	app.get('/',require('./home'));
	app.use('/download',require('./download'));

	app.use(function(req,res){
		res.send('404');
	})
};