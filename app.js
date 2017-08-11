/**
 * Created by Roc on 2017/8/10.
 * desc:
 */
var express = require('express');
var app = express();

app.use(express.static('./dist'));
app.get('/', function (req, res) {
    res.sendFile('/dist/index.html')
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});