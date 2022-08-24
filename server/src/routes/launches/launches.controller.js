const {getAllLaunches, addLaunch, removeLaunch} = require('../../models/launches.model');
const {getPagination} = require('../../services/query')

async function httpGetAllLaunches(req, res) {
  const { skip , limit } = getPagination(req.query);
  console.log('ENTERED httpgetAllLaunches', req.query);
  const launches = await getAllLaunches(skip , limit);
  console.log("return from getAllLaunches", launches);
  return res.status(200).json(launches);
}

async function httpAbortLaunch(req, res) {
  const id = req.params.id;
  const launchValues = await getAllLaunches()
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

async function httpSubmitLaunch(req, res) {
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
  await addLaunch(launch);
  return res.status(201).json({launch, message:'Launch added'});
}

module.exports = {
  httpGetAllLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
}