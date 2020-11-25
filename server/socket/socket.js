const connectedUsers = {};
const rooms = [];

module.exports = (server) => {
  // const http = require('http').createServer(server);
  const io = require('socket.io')(server, { origins: '*:*' });
  io.on('connection', (socket) => {
    const id = socket.client;
    let connectedUser;
    let room;
    let isRoomFull = false;

    socket.on('create_room', ({ user, roomId }) => {
      socket.roomId = roomId;
      socket.join(roomId);
    });

    socket.on('code_result', (codeResult) => {
      console.log(
        'OUTPUT ~ file: socket.js ~ line 67 ~ socket.on ~ codeResult',
        codeResult
      );
      socket.broadcast.to(socket.roomId).emit('result_code', codeResult);
    });

    socket.on('change_text', (code) => {
      console.log(code);
      socket.broadcast.to(socket.roomId).emit('new_content', code);
    });

    const waitingRoomFull = () => {
      return Object.keys(connectedUsers[room]).length === 2;
    };

    socket.on('join_room', ({ user, roomId }) => {
      connectedUser = user._id;
      room = roomId;

      if (connectedUsers[room]) {
        if (waitingRoomFull()) {
          isRoomFull = true;
          socket.emit('users', 'full');
          return;
        }
        connectedUsers[room][connectedUser] = user;
      } else {
        user['isOwner'] = true;
        connectedUsers[room] = {
          [connectedUser]: user,
        };
      }
      io.emit('users', connectedUsers[room]);
    });

    socket.on('start_interview', (roomId) => {
      io.emit('join_interview_room', connectedUsers[roomId]);
    });

    socket.on('waiting_room_disconnect', () => {
      if (!isRoomFull) {
        delete connectedUsers[room][connectedUser];
        isRoomFull = false;
        io.emit('users', connectedUsers[room]);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${id} disconnected`);
    });
  });
  return io;
};
