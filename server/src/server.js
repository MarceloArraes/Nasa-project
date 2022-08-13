const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const {loadPlanetsData} = require('./models/planets.model');

const server = http.createServer(app);

mongoose.connection.once('connected', () => {
  console.log('Connected to MongoDB');
}).on('error', (err) => {
  console.log('Error connecting to MongoDB: ', err);
}).on('disconnected', () => {
  console.log('Disconnected from MongoDB');
}).on('reconnected', () => {
  console.log('Reconnected to MongoDB');
}).on('open', () => {
  console.log('MongoDB connection opened');
}).on('close', () => {
  console.log('MongoDB connection closed');
}).on('reconnectFailed', () => {
  console.log('MongoDB reconnection failed');
}).on('reconnecting', () => {
  console.log('MongoDB reconnecting');
}).on('fullsetup', () => {
  console.log('MongoDB fullsetup');
}).on('all', (event) => {
  console.log('MongoDB all: ', event);
})


async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  } );
}

startServer();