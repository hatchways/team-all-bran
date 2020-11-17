module.exports = (server) => {
  // const http = require('http').createServer(server);
  const io = require('socket.io')(server, { origins: '*:*' });

  let interval;

  io.on('connection', (socket) => {
    console.log('Client connected');

    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  const getApiAndEmit = (socket) => {
    const response = new Date();
    socket.emit('FromAPI', response);
  };

  return io;
};
