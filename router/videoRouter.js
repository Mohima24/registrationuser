const express = require('express');
const path = require('path');
const VideoRouter = express.Router();
VideoRouter.get('/', (req, res) => {
  res.send('hello');
});
module.exports = {
  VideoRouter
};
