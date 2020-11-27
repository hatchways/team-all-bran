const socketToUsers = new Map();
const usersToSockets = new Map();
const rooms = {};

module.exports = (server) => {
  // const http = require('http').createServer(server);
  const io = require('socket.io')(server, { origins: '*:*' });
  io.on('connection', (socket) => {
    const { id } = socket.client;

    socket.on('start_interview', (roomId) => {
      io.emit('join_interview_room', socketToUsers[roomId]);
    });

    socket.on('create_room', ({ user, roomId }) => {
      //check if room exists

      if (rooms[roomId]) {
        if (Object.keys(rooms[roomId]).length < 2) {
          rooms[roomId][user._id] = user;
          socket.roomId = roomId;
          socket.join(roomId);
          io.to(socket.roomId).emit('lobby_users', {
            users: Object.values(rooms[roomId]),
          });
        }
      } else {
        console.log('GETTING HERE IN THE ELSE', roomId);
        const userId = user._id;
        rooms[roomId] = {
          [user._id]: user,
        };
        socket.roomId = roomId;
        console.log('joining room: ', roomId);
        socket.join(roomId);
        io.to(socket.roomId).emit('lobby_users', {
          users: Object.values(rooms[roomId]),
        });
      }
    });

    socket.on('leave_room', ({ userId, roomId }) => {
      // delete rooms[roomId][userId];
      socket.leave(roomId);
      console.log('leaving room: ', roomId);
      console.log(userId);
    });

    socket.on('code_result', (codeResult) => {
      socket.broadcast.to(socket.roomId).emit('result_code', codeResult);
    });

    socket.on('change_text', (code) => {
      socket.broadcast.to(socket.roomId).emit('new_content', code);
    });

    socket.on('change_language', (language) => {
      socket.broadcast.to(socket.roomId).emit('language_change', language);
    });

    socket.on('new_cursor_position', ({ lineNumber, column }) => {
      socket.broadcast
        .to(socket.roomId)
        .emit('updated_position', { lineNumber, column });
    });

    socket.on('logged_in', (userId) => {
      socket.userId = userId;
      usersToSockets[userId] = id;
      socketToUsers[id] = userId;
    });

    socket.on('logged_out', () => {
      delete usersToSockets[socket.userId];
      delete socketToUsers[id];
    });

    socket.on('disconnect', () => {
      delete usersToSockets[id];
      delete socketToUsers[socket.userId];
      console.log(`User ${id} disconnected`);
    });
    console.log('io.sockets.adapter.rooms: ', io.sockets.adapter.rooms);
  });
  return io;
};

// let connectedUser;
// let room;
// let isRoomFull = false;

// const waitingRoomFull = () => {
//   return Object.keys(socketToUsers[room]).length === 2;
// };

// socket.on('join_room', ({ user, roomId }) => {
//   connectedUser = user._id;
//   room = roomId;

//   if (socketToUsers[room]) {
//     if (waitingRoomFull()) {
//       isRoomFull = true;
//       socket.emit('users', 'full');
//       return;
//     }
//     socketToUsers[room][connectedUser] = user;
//   } else {
//     user['isOwner'] = true;
//     socketToUsers[room] = {
//       [connectedUser]: user,
//     };
//   }
//   io.emit('users', socketToUsers[room]);
// });

// socket.on('waiting_room_disconnect', () => {
//   if (!isRoomFull) {
//     delete socketToUsers[room][connectedUser];
//     isRoomFull = false;
//     io.emit('users', socketToUsers[room]);
//   }
// });
