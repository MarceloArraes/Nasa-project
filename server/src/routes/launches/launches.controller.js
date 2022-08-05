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
   if(!launch.mission || !launch.launchDate || !launch.target || !launch.rocket) {
    return res.status(400).json({
      message: 'Missing required fields.'
    });
  }

  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate.valueOf())) {
    return res.status(400).json({
      message: 'Invalid launch date.'
    });
  }
  addLaunch(launch);
  return res.status(200).json({launch, message:'Launch added'});
}

module.exports = {
  httpGetAllLaunches,
  httpSubmitLaunch,
}