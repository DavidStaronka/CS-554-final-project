const app = require('express');
const http = require('http').createServer(app);
var io = require('socket.io')(http);
rooms = {};

io.on('connection', (socket) => {
    console.log('new client connected', socket.id);

    socket.on('DM_join', (sessionId) => {
        console.log('DM_join', sessionId);
        socket.join(sessionId);
        if (!rooms[sessionId]) {
            rooms[sessionId] = {
                users: [],
                DMID: socket.id
            };
        }
    });

    socket.on('user_join', (charId, charName, sessionId, health) => {
        console.log("char joined", charId, charName, sessionId, health);
        if(!rooms[sessionId]){
            io.to(socket.id).emit('Room_closed');
            return;
        }
        rooms[sessionId].users.push({
            id: socket.id,
            charId: charId
        });
        socket.join(sessionId);
        io.to(rooms[sessionId].DMID).emit('user_join', {charId: charId, charName:charName, health: health});
    });

    socket.on('healthChange', (val, sessionId, charId) => {
        console.log("healthChange", sessionId, charId, val);
        for (user of rooms[sessionId].users){
            if(user.charId === charId){
                io.to(user.id).emit('healthChange', val);
            }
        }
    });

    socket.on('disconnect', (sessionId) => {
        console.log('Disconnect Fired');
        if(!rooms[sessionId]){
            return;
        }
        for(user of rooms[sessionId].users) {
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