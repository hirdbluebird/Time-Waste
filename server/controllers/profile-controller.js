var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.updatePhoto = function(req, res) {
	var file = req.files.file;
	var userId = req.body.userId;

	console.log('User ' + userId + ' is submitting ', file);

	var uploadDate = new Date().toISOString;

	var tempPath = file.path;
	var targetPath = path.join(__dirname, '../../uploads/' + userId + uploadDate + file.name);
	var savePath = '/uploads/' + userId + uploadDate + file.name;

	fs.rename(tempPath, targetPath, function(err){
		if(err) {
			console.log(err);
		} else {
			User.findById(userId, function(err, userData){
				var user = userData;
				user.image = savePath;
				user.save(function(err){
					if(err){
						console.log('failed save');
						res.json({ status: 500 });
					} else {
						console.log('saved successful');

						res.json({ status: 200 });
					}
				});
			});
		}
	});
};

module.exports.updateUsername = function(req,res){
	var username = req.body.username;
	var userId = req.body.userId;

	User.findById(userId, function(err, userData){
		var user = userData;
		user.username = username;


		console.log(user.username, userId);
		user.save(function(err){
			if(err){
				console.log('error saveing username');
				res.json({status: 200});
			} else {
				console.log('success, new name saved');
				res.json({status: 500});
			}
		});
	});
}
module.exports.updateBio = function(req, res) {
	var bio = req.body.bio;
	var userId = req.body.userId;

	User.findById(userId, function(err, userData) {
		var user = userData;
		user.bio = bio;

		user.save(function(err){
			if(err){
				console.log('failed saving bio');
			} else {
				console.log('success saveing bio');
			}
		})
	})
}