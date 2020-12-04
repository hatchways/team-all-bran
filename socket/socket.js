const cookieParser = require('socket.io-cookie-parser');
const { authorization } = require('./authorization');

const { Interview } = require('../models/Interview');

const socketToUsers = new Map();
const usersToSockets = new Map();
const rooms = {};

module.exports = (server) => {
  const io = require('socket.io')(server, { path: '/sockets' });
  io.use(cookieParser());
  io.use(authorization);

  io.on('connection', (socket) => {
    const { id } = socket;

    console.log(
      `Connected and authorized, SOCKET ID: ${id} USERID: ${socket.userId}`
    );
    socketToUsers[id] = socket.userId;
    usersToSockets[socket.userId] = socket.id;

    socket.on('leave_interview', ({ roomId }) => {
      if (Object.keys(rooms[roomId]).length === 2) {
        Interview.findByIdAndUpdate(
          { _id: roomId },
          { code: rooms[roomId].code },
          { upsert: true }
        ).then((_) => delete rooms[roomId]);
      } else {
        delete rooms[roomId][socket.userId];
      }
      socket.leave(roomId);
      socket.emit('user_left', { roomId });
    });

    socket.on('start_interview', (roomId) => {
      io.to(roomId).emit('join_interview_room');
    });

    socket.on('call_user', (data) => {
      io.to(usersToSockets[data.userToCall]).emit('start_call', {
        signal: data.signalData,
        from: data.from,
      });
    });

    socket.on('accept_call', (data) => {
      io.to(usersToSockets[data.to]).emit('call_accepted', data.signal);
    });

    socket.on('end_call', ({ roomId }) => {
      io.in(roomId).emit('end_call');
    });

    socket.on('create_room', ({ user, roomId }) => {
      socket.user = user._id;
      if (rooms[roomId]) {
        if (Object.keys(rooms[roomId]).length < 2) {
          console.log('joining room: ', roomId);

          rooms[roomId][user._id] = user;
          socket.roomId = roomId;
          socket.join(roomId);
        } else {
          // room is full
          if (rooms[roomId][user._id]) {
            socket.join(roomId);
            user.isOwner = true;
          } else {
            io.to(socket.id).emit('room_full', null);
          }
        }
      } else {
        user.isOwner = true;
        rooms[roomId] = {
          [user._id]: user,
        };
        socket.roomId = roomId;
        socket.join(roomId);
      }
      io.to(roomId).emit('lobby_users', {
        users: Object.values(rooms[roomId]),
      });
    });

    socket.on('create_interview', ({ user, roomId }) => {
      socket.join(roomId);
      socket.user = user._id;
      socket.roomId = roomId;
      if (rooms[roomId]) rooms[roomId][user._id] = user;
      else
        rooms[roomId] = {
          [user._id]: user,
        };
      console.log(
        `${user.firstName} ${user.lastName} ${socket.userId} created or joined a room on socket: ${socket.id} to ROOM ${roomId}`
      );
    });

    socket.on('leave_lobby', ({ userId, roomId }) => {
      delete rooms[roomId][userId];
      socket.leave(roomId);
      io.to(roomId).emit('lobby_users', {
        users: Object.values(rooms[roomId]),
      });
    });

    socket.on('code_result', (codeResult) => {
      socket.broadcast.to(socket.roomId).emit('result_code', codeResult);
    });

    socket.on('change_text', ({ code, roomId }) => {
      const room = rooms[roomId];
      room['code'] = code;
      io.to(roomId).emit('new_content', code);
    });

    socket.on('change_language', (language) => {
      socket.broadcast.to(socket.roomId).emit('language_change', language);
    });

    socket.on('new_cursor_position', ({ lineNumber, column }) => {
      socket.broadcast
        .to(socket.roomId)
        .emit('updated_position', { lineNumber, column });
    });

    socket.on('logged_out', () => {
      socket.disconnect();
      socket.leave(socket.roomId);
      delete usersToSockets[socket.userId];
      delete socketToUsers[id];
    });

    socket.on('disconnect', () => {
      delete usersToSockets[id];
      delete socketToUsers[socket.userId];
    });
  });
  return io;
};
