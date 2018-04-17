var express = require('express');
var router = express.Router();

router.get('/refresh', function (req, res, next) {
    // findepisode
    res.render('vod',{"json":['lzy','dophin','ejs']});
});

function findepisode(season, callback){
    const path = '/usr/local/var/www/hls/'+season;
    fs.readdir(path, function(err, files) {
        if (err) {
            callback(err);
            console.log('error:\n' + err);
        }
        callback(null, files);
        console.log(files);
    });
}

module.exports = router;