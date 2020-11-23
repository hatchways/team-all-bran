const connectedUsers = {};

module.exports = (server) => {
  // const http = require('http').createServer(server);
  const io = require('socket.io')(server, { origins: '*:*' });
  io.on('connection', (socket) => {
    let connectedUser;
    let room;

    const waitingRoomFull = () => {
      return Object.keys(connectedUsers[room]).length === 2
    }

    socket.on('join_room', ({ user, roomId }) => {
      connectedUser = user._id;
      room = roomId;

      if (connectedUsers[room]) {
        if (waitingRoomFull()) {
          socket.emit('users', null);
          return;
        }
        connectedUsers[room][connectedUser] = user;
      } else {
        user['isOwner'] = true
        connectedUsers[room] = {
          [connectedUser]: user
        }
      }
      io.emit('users', connectedUsers[room]);
    });

    socket.on('start_interview', (roomId) => {
      io.emit('join_interview_room', connectedUsers[roomId]);
    });

    socket.on('waiting_room_disconnect', () => {
      delete connectedUsers[room][connectedUser];

      io.emit('users', connectedUsers[room]);
    });

    socket.on('disconnect', () => {

    });

  });
  return io;
};
