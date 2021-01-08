const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
const server = app.listen(8888);
const io = require('socket.io')(server);

io.on('connection', function (socket) {

    socket.on('new_user', function (data) {
        
    })

});
