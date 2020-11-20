module.exports = (server) => {
  // const http = require('http').createServer(server);
  const io = require('socket.io')(server, { origins: '*:*' });
  const connectedUsers = {};
  io.on('connection', (socket) => {
    let connectedUser;
    socket.on('join_lobby', (user) => {
      connectedUser = user._id;
      connectedUsers[connectedUser] = user;
      io.emit('users', connectedUsers);
    });
    socket.on('disconnect', () => {
      delete connectedUsers[connectedUser];
      io.emit('users', connectedUsers);
    });
  });
  return io;
};
