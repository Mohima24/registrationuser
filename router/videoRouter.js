const express = require('express');
const path = require('path');
const VideoRouter = express.Router();
VideoRouter.get('/', (req, res) => {
  res.send('hello');
});

VideoRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.redirect(`/video/room/${id}`);
});
VideoRouter.get('/room/:room', (req, res) => {
  const filePath = path.join(__dirname,'../../Frontend/room.html');
  res.sendFile(filePath);
});

module.exports = {
  VideoRouter
};
