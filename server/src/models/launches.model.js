const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')


const DEFAULT_FLIGHT_NUMBER = 100;
/* const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: 'Kepler exploration something',
  rocket: 'Falcon 1',
  launchDate: new Date('2021-05-09'),
  target: 'Kepler-442 b',
  customes: ['ZTM', 'SpaceX'],
  upcoming: true,
  sucess:true
} */

//launches.set(launch.flightNumber, launch);

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase
    .findOne({})
    .sort('-flightNumber');
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  console.log('getAllLaunches');
  const launchesD = await launchesDatabase.find({}, {
    '_id': 0, '__v': 0
  });
  return launchesD;
}

async function addLaunch(launch) {
  console.log('addLaunch');
  const latestFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = {
    ...launch,
    success: true,
    upcoming: true,
    customers: ['MAT', 'SpaceX'],
    flightNumber: latestFlightNumber,
  };
  await saveLaunch(newLaunch);

//local saving
/*   launches.set(latestFlightNumber + 1, Object.assign(launch, {
    flightNumber: latestFlightNumber + 1,
    customers: ['MAT', 'SpaceX'],
    upcoming: true,
    sucess:true
  }));
  latestFlightNumber++; */
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target
  });
  if (!planet) {
    throw new Error('Planet not found');
  }
  try {
    await launchesDatabase.updateOne({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true
    });
  }
  catch (err) {
    console.log("could not sabe launch ", err);
  }

}

async function removeLaunch(launch) {
  console.log('removeLaunch');
/*   const abortedLaunch = launches.get(launch.flightNumber)
  //return launches.delete(launch.flightNumber);
  abortedLaunch.upcoming = false;
  abortedLaunch.sucess = false; */

  const deleteLaunch = await launchesDatabase.updateOne({
    flightNumber: launch.flightNumber
  }, {
    upcoming: false,
    success: false
  });
  console.log('deleteLaunch', deleteLaunch);
  return deleteLaunch.modifiedCount === 1;

}

module.exports = {
  getAllLaunches,
  addLaunch,
  removeLaunch
}