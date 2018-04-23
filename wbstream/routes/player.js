var express = require('express');
var router = express.Router();

// /player?filename=jkljlkjl
router.get(/^\/player\/(\w+)$/, function(req, res) { // /^\/player\/[a-zA-Z0-9]\.[a-z]{3}/ /player/Django.mp4
	console.log('player!', req.params[0]);
	var filename = req.params[0];

	res.render('player', {
		data: filename
	});
});
module.exports = router;
///^\/player\/(\w+)\.[a-z]{3}$/