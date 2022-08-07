const {getAllLaunches, addLaunch, removeLaunch} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  console.log('ENTERED httpgetAllLaunches');
  const launches = getAllLaunches();
  return res.status(200).json(launches);
}

function httpAbortLaunch(req, res) {
  const id = req.params.id;
  const launchValues = getAllLaunches()
  const launch = launchValues.find(launch => launch.flightNumber == id);
  console.log('ENTERED httpAbortLaunch: ', id, launch);
  if (!launch) {
    return res.status(404).json({
      message: 'Launch not found.'
    });
  }
  if(!removeLaunch(launch)) return res.status(404).json({
      message: 'error removing Launch'
    });
  return res.status(200).json({ message:`Aborted Launch mission ${launch.mission} id:${launch.flightNumber}.` });
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
  return res.status(201).json({launch, message:'Launch added'});
}

module.exports = {
  httpGetAllLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
}