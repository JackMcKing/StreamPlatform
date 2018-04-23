var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    let path = '/usr/local/var/www/hls/sum';
    finder(path, (err, files) => {
        if (err) {
            res.end(JSON.stringify(err));
            return;
        }
        let out = {
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

router.get(/\/episodeload\/([^\/]+)\/?$/, function(req, res, next) {
    let seasonname = req.params[0];
    console.log('seasonname!!!', seasonname);
    // var episodesArry = eposidefinder('/usr/local/var/www/hls/'+seasonname);
    // console.log('routerget::::', episodesArry[1]);
    // res.send('<button>'+episodesArry[1]+'</button>')
    let path = '/usr/local/var/www/hls/sum/' + seasonname;
    finder(path, (err, files) => {
        if (err) {
            res.end(JSON.stringify(err));
            return;
        }
        let out = {
            error: null,
            files: files
        };
        let initbtns = '';
        for (let n = 0; n < files.length; n++) {
            let index = files[n].indexOf('.');
            let filename = files[n].substring(0, index);
            let newbtns = "<button type='button' class='btn btn-default episodebtn' onclick=jump(this)>" + filename + "</button>";
            initbtns = initbtns + newbtns;
        }
        console.log('initbtns::::::', initbtns);
        res.send(initbtns)
    });
});

function finder(path, callback) {
    // const path = '/usr/local/var/www/hls';
    fs.readdir(path, function(err, files) {
        if (err) {
            callback(err);
            console.log('error:\n' + err);
        }
        callback(null, files);
        console.log(files);
    });

}

function eposidefinder(path) {
    var outfiles = new Array();
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log(err);
        }
        console.log(files);
        Array.prototype.push.apply(outfiles, files)
    });
    console.log('outfiles:::::', outfiles);
    return outfiles
}

function explorer(path) {

    fs.readdir(path, function(err, files) {
        let episodesArry = new Array('');
        //err 为错误 , files 文件名列表包含文件夹与文件
        if (err) {
            console.log('error:\n' + err);
            return;
        }

        files.forEach(function(file) {

            fs.stat(path + '/' + file, function(err, stat) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stat.isDirectory()) {
                    // 如果是文件夹遍历
                    explorer(path + '/' + file);
                } else {
                    // 读出所有的文件
                    console.log('文件名:' + path + '/' + file);
                    episodesArry.push(file)
                }

            });

        });
        console.log('esary 0:::::', episodesArry[0]);
        console.log('esary 1:::::', episodesArry[1]);
        return episodesArry
        fs.readdir()
    });
}


module.exports = router;