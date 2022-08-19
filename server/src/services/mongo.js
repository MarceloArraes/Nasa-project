const mongoose = require('mongoose');
require('dotenv').config();

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

async function mongoConnect() {
  await mongoose.connect(process.env.MONGODB_URI);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}