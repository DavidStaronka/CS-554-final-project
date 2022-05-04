const app = require('express');
const http = require('http').createServer(app);
var io = require('socket.io')(http);
users = [];

io.on('connection', (socket) => {
    console.log('new client connected', socket.id);

    socket.on('user_join', (name, room) => {
        socket.join(room);
        users.push({
            id: socket.id,
            name: name,
            room: room
        });
        io.to(room).emit('user_join', name);
    });

    socket.on('message', ({message}) => {
        for(user of users) {
            if (user.id === socket.id) {
                console.log(user.name, message, socket.id);
                io.to(user.room).emit('message', { name: user.name, message: message });
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnect Fired');
        for(user of users) {
            if (user.id === socket.id) {
                console.log(user.name, socket.id);
                io.to(user.room).emit('user_left', user.name);  
                users.splice(users.indexOf(user), 1);  
            }
        }
    });
});

http.listen(4000, () => {
    console.log(`listening on *:${4000}`);
});