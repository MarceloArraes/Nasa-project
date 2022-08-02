const {launches} = require('../../models/launches.model');

function getAllLaunches(req, res) {
/*   launchesArray= [];
  launches.map(launch => {
    launchesArray.push(JSON.parse(launch));
  });
  return res.status(200).json(launchesArray); */
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches,
}