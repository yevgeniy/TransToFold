/*
const fs = require('fs');
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('photo', (data) => {
    try {
      // Parse and save the photo data to a file
      const filename = `photo_${Date.now()}.jpg`;
      fs.writeFile(`uploads/${filename}`, data, 'binary', (error) => {
        if (error) {
          console.error('Error saving photo:', error);
          socket.emit('uploadError', 'Error saving photo.');
        } else {
          console.log('Photo saved:', filename);
          socket.emit('uploadSuccess', 'Photo saved successfully.');
        }
      });
    } catch (error) {
      console.error('Error handling photo data:', error);
      socket.emit('uploadError', 'Error handling photo data.');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/