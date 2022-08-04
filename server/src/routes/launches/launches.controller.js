const {getAllLaunches, addLaunch} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  console.log('ENTERED httpgetAllLaunches');
  const launches = getAllLaunches();
  return res.status(200).json(launches);
}
function httpSubmitLaunch(req, res) {
  console.log('ENTERED httpSubmitLaunch');
  console.log('req.body: ', req.body);
  const launch = req.body;
  console.log('launch: ', launch);
  launch.launchDate = new Date(launch.launchDate)
  addLaunch(launch);
  return res.status(200).json({launch, message:'Launch added'});
}

module.exports = {
  httpGetAllLaunches,
  httpSubmitLaunch,
}