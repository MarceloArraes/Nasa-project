const {getAllLaunches} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  console.log('ENTERED httpgetAllLaunches');
  const launches = getAllLaunches();
  return res.status(200).json(launches);
}

module.exports = {
  httpGetAllLaunches,
}