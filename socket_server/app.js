const app = require('express');
const http = require('http').createServer(app);
var io = require('socket.io')(http);
rooms = {};

io.on('connection', (socket) => {
    console.log('new client connected', socket.id);

    socket.on('user_join', (charId, sessionId) => {
        socket.join(room);
        if(!rooms[sessionId]){
            rooms[sessionId] = [];
        }
        rooms[sessionId].push({
            id: socket.id,
            charId: charId
        });
        io.to(room).emit('user_join', charId);
    });

    socket.on('healthChange', (val, sessionId, charId) => {
        for (user of rooms[sessionId]){
            if(user.charId === charId){
                io.to(user.id).emit('healthChange', val);
            }
        }
    });

    socket.on('disconnect', (sessionId) => {
        console.log('Disconnect Fired');
        for(user of rooms[sessionId]) {
            if (user.id === socket.id) {
                console.log(user.name, socket.id);
                io.to(user.room).emit('user_left', user.name);
                rooms[sessionId].splice(rooms[sessionId].indexOf(user), 1);
                if(rooms[sessionId].length === 0){
                    delete rooms[sessionId];
                }
            }
        }
    });
});

http.listen(4000, () => {
    console.log(`listening on *:${4000}`);
});