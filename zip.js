var fs = require('fs'),
 tar = require('tar'),
 zlib = require('zlib'),
 fstream = require('fstream');


function zip(foldname){
	fstream.Reader({
		'path':foldname,
		'type':'Directory'
	}).pipe(tar.Pack())
		.pipe(zlib.Gzip())
			.pipe(fstream.Writer({'path':'public/'+foldname+'.zip'}));

}

module.exports = zip;