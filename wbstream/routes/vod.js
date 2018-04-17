var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    finder((err, files) => {
        if (err) {
            res.end(JSON.stringify(err));
            return;
        }
        var out = {
            error: null,
            files: files
        };
        // res.writeHead(200, {
        // 	"Content-Type": "application/json"
        // });
        // res.end(JSON.stringify(out));
        res.render('vod', {
            data: out
        });
    });
});

router.get('/text', function (req, res, next) {
   res.send('<button>testbutton</button>')
});

function finder(callback) {
    const path = '/usr/local/var/www/hls';
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